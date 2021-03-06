const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const path = require("path");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static("/client/build"));
}

// Add routes, both API and view
// app.use(routes);

// Set up promises with mongoose
// mongoose.Promise = global.Promise;
// // Connect to the Mongo DB
// mongoose.connect(
//   "mongodb://heroku_6k1wqc17:chg62ihjlk631i7ng2b0mnri7a@ds125058.mlab.com:25058/heroku_6k1wqc17",
//   {
//     useMongoClient: true
//   }
// );

app.get('/home', function(req, res) {
	console.log('hit the catch all route !!!!!', path.join(__dirname, "./client/build"));
	res.sendFile(path.join(__dirname, "client/build"));
	// res.send('tomas')
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
