//import express and set up webserver on 3000
const express = require("express");
const app = express();
const server = app.listen(3000);

//import osc
const osc = require('node-osc');

let client = new osc.Client('10.0.0.162', 8888);

//import path so we can use the public folder
const path = require("path");

//import sockket.io
const io = require("socket.io")(server);

//expose the local public folder for inluding files js, css etc..
app.use(express.static("public"));
//respond to an http request with index.html
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    socket.on('message', function(msg) {
        console.log(msg);
        client.send('/led', msg.x, function() {});
    });
});