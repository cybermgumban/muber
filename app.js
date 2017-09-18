const express = require("express");

const app = express();


//watch for incoming requests of method Get
// to the router http://localhost:3050/api
app.get('/api', (req, res) => {
    res.send({ hi: 'there' });
});

//to run this program, type in your terminal "node index.js"

module.exports = app;