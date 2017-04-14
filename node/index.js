'use strict';

let express = require('express');
let fs = require('fs');
let GIF = require('./presentations/GIF');
let java = require('child_process').spawn;
let jsonfile = require('jsonfile');
let parser = require('body-parser');
let path = require('path');

let app = express();
app.use(parser.json());

// State
let proc = null;
let state = new GIF('0fire');

app.get('/off', (req, res) => {
});

app.get('/on', (req, res) => {

});

app.get('/toggle', (req, res) => {

});

app.put('/mode/gif', (req, res) => {
	state.deserialize(req.body);

	let flags = state.generateFlags();
	let jarPath = path.join(__dirname, '../java/pixelc.jar');
	flags = ['-jar', jarPath].concat(flags);

	console.log(flags);
	let child = java('java', flags);
	res.send(flags);
});

app.listen(3000, () => {
	console.log('Express server has started');
});
