'use strict';

let exec = require('child_process').exec;
let express = require('express');
let fs = require('fs');
let GIF = require('./presentations/GIF');
let jsonfile = require('jsonfile');
let parser = require('body-parser');
let path = require('path');
let treeKill = require('tree-kill');

let app = express();
app.use(parser.json());

// State
let proc = null;
let state = new GIF('0fire');

//Helper functions
function generateFullCmd(flags) {
	let gifPath = path.join(__dirname, '../java');
	let jarPath = path.join(__dirname, '../java/pixelc.jar');

	return 'cd ' + gifPath + ' && ' + 'sudo java -jar ' + jarPath + ' ' + flags;
}

function off() {
	state.power = 0;
	treeKill(proc.pid, 'SIGKILL');
}

function on() {
	state.power = 1;
	proc = exec(generateFullCmd(state.generateFlags()));
}

//Routes
app.get('/', (req, res) => {
	res.json(state.serialize());
});

app.get('/off', (req, res) => {
	off();
	res.json(state.serialize());
});

app.get('/on', (req, res) => {
	on();
	res.json(state.serialize());
});

app.get('/toggle', (req, res) => {
	state.power == 0 ? on() : off();
	res.json(state.serialize());
});

app.put('/mode/gif', (req, res) => {
	state.deserialize(req.body);
	on();
	res.json(state.serialize());
});

app.listen(80);
