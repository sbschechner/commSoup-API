const express = require('express');
 const app = express();

 const PORT = process.env.PORT || 3000;

 app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 app.get('/api/*', (req, res) => {
   res.json({hello: "yes it is me"});
 });



 app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

 module.exports = {app};