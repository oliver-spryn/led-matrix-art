'use strict';

let exec = require('child_process').exec;
let express = require('express');
let fs = require('fs');
let GIF = require('./presentations/GIF');
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
	let gifPath = path.join(__dirname, '../java');
	let jarPath = path.join(__dirname, '../java/pixelc.jar');
	flags = ['-jar', jarPath].concat(flags);

	let cmd = 'cd ' + gifPath + ' && ' + 'sudo java ' + flags.join(' ');

	console.log(cmd);
	let child = exec(cmd);
	res.send(cmd);
});

app.listen(3000, () => {
	console.log('Express server has started');
});
