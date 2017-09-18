const express = require("express");
const routes = require("./routes/routes");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
mongoose.connect('mongodb://localhost/muber');
}
// to use the bodyParser, body parser is used to handle requests
// should put before routes(app);
app.use(bodyParser.json());

//watch for incoming requests of method Get
// to the router http://localhost:3050/api
routes(app);

//to run this program, type in your terminal "node index.js"

module.exports = app;