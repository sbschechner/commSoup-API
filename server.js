var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose')

mongoose.Promise = global.Promise;

var {PORT, DATABASE_URL} = require('./config');
var {SoupData} = require('./models');

var app = express();
app.use(express.static(__dirname + '/public')); //??????allows the server where to look in public for templates
app.use(morgan('common'));
app.use(bodyParser.json());


 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//write a get request to get the first 5 to preview what it looks like

app.get("/soupKitchens", function(request, response){
	console.log("querying the database to preview data in it");
	SoupData	
		.find(5)
		.exec()
		.then(function(kitchens){
			response.json({kitchens: kitchens.map(
				(kitchen) =>
				kitchen.apiReturn())
				});
			})
		.catch(error =>{
			console.error(error);
			response.status(500).json({message:"error getting that data"});
		});
	});


app.get("/soupKitchensSpecific", function(request,response){
	const{kitchId} = request.query;
	var id = require('mongodb').ObjectID(kitchId);
	console.log(kitchId);
	console.log(id);
	SoupData
		.findById(id)
		.exec()
		.then(kitchen => response.json(kitchen.apiReturn()))
		.catch(error => {
			console.error(500).json({message: "Get Error by Id: Internal Server Error"})
		});
	});


app.use("*", function(request,response){
	response.status(404).json({message: "Not Found"});
	});

 var server;

function runServer(database_URL = DATABASE_URL, port = PORT ){
	return new Promise((resolve, reject)=>{
		mongoose.connect(database_URL, error =>{
			if (error){
				console.log("Server Connection Not Working")
				return reject(error);
			}
			server = app.listen(port, () => {
				console.log("everything connected");
				resolve();
			})
			.on("error", error => {
				mongoose.disconnect();
				reject(error);
			});
		});
	});
}

function closeServer(){
	return mongoose.disconnect().then(()=> {
		return new Promise((resolve, reject) =>{
			console.log("closing the server");
			server.close(error => {
				if (error){
					return reject(error);
				}
				resolve();
			});
		});
	});
}


//so I can use these runServer and close server functions in testing file
if (require.main === module){
	runServer().catch(error => console.log(error));
};

module.exports = {app,runServer,closeServer};
