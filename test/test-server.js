var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var faker = require('faker');
//https://github.com/Marak/faker.js

var {app, runServer, closeServer} = require("../server");
var {SoupData} = require("../models");
var {TEST_DATABASE_URL} = require("../config");

var should = chai.should();
chai.use(chaiHttp);

 //NEED TO CREATE SEEDING TO TEST GET REQUEST

function seedSoupData() {
	console.log("seeding the kitchens");
	var seedData = [];
	for (var i=0; i<5; i++){ //create 5 fake entries
		seedData.push(generateSeedData());
	}
	return SoupData.insertMany(seedData);
}

function generateName(){
	var names = ["kitchen1", "The Best Kitchen", "helping out"]
	return names[Math.floor(Math.random()*names.length)];
}

function generateSite(){
	var amounts =["google.com", "greatwebsite.com", "thisWebsite.com", "website.com"]
	return amounts[Math.floor(Math.random()*amounts.length)];
}

function generateSeedData(){
	return {
		FIELD1: generateName(),
		FIELD2: faker.address.streetAddress(),
		FIELD3: faker.address.city(),
		FIELD4: faker.address.state(),
		FIELD5: faker.address.zipCode(),
		FIELD6: faker.phone.phoneNumber(),
		FIELD7: generateSite(),
		FIELD8: faker.hacker.noun(),
		FIELD9: faker.hacker.noun(),
		FIELD10: faker.hacker.noun(),
		FIELD11:faker.hacker.noun(),
		FIELD12:faker.hacker.noun(),
		FIELD14: faker.hacker.noun(),
		FIELD15: faker.hacker.noun(),
		FIELD16: faker.hacker.noun(),
		FIELD17: faker.hacker.noun(),
		FIELD18: faker.hacker.noun(),
		FIELD19: faker.hacker.noun(),
		FIELD20: faker.hacker.noun(),
		FIELD21: faker.hacker.noun(),
	}
}	

//need to tearDown to keep tests independent from each other

function tearDown() {
	console.log("delete the db")
	return mongoose.connection.dropDatabase();
}

describe("Expense Tracker API and Endpoints Tests", function() {
	before(function(){
		return runServer(TEST_DATABASE_URL);
	});

	beforeEach(function(){
		return seedSoupData();
	});

	afterEach(function(){
		return tearDown();
	});

	after(function(){
		return closeServer();
	});


describe("testing the Get endpoint", function(){

		it("should return all the kitchens", function(){
			var response;
				return chai.request(app)
				.get('/soupKitchens')
				.then(function(_response){
					response = _response;
					response.should.have.status(200);
					response.body.kitchens.should.have.length.of.at.least(1);
					return SoupData.count();
				})
				.then(function(count){
					response.body.kitchens.should.have.length.of(count);
				});
		});

		it("should return the right aspects of each expense", function(){
			var responseExpense;
			return chai.request(app)
				.get("/soupKitchens")
				.then(function(response){
					response.should.have.status(200);
					response.should.be.json;
					response.body.kitchens.should.be.a('array');
					response.body.kitchens.should.have.length.of.at.least(1);
					response.body.kitchens.forEach(function(kitchen){
						kitchen.should.be.a('object');
						kitchen.should.include.keys(
							"name", "lat");
						});
					responseKitchen = response.body.kitchens[1];
					return SoupData.findById(responseKitchen.id);
				})
				.then(function(kitchen){
					responseKitchen.id.should.equal(kitchen.id);
				});
			});
		});


describe("making sure page is up and running", function(){
	it("returns HTML", function(){
		return chai.request(app)
			.get("/soupKitchens")
			.then(function(response){
				response.should.have.status(200);
			});
		});
 	});

});