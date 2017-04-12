'use strict';

let app = require('express').express();
let fs = require('fs');
let java = require('child_process').spawn;
let jsonfile = require('jsonfile');
let parser = require('body-parser');

app.use(parser.json());

//Helper functions

let config = { };

function buildProcParams() {
	switch(config
}

function setConfig(userConfig) {
	let file = 'config.json';

	try {
		fs.accessSync(file, fs.F_OK);
	} catch(e) {
		jsonfile.writeFileSync(file, {
			common: {
				daemon: true,
				matrix: 'adafruit32x32',
				power: 'off',
				write: false
			},
			gif: {
				framedelay: 0
				gif: 'zzzblank',
				loop: 0
			},
			mode: 'gif'
		});
	} finally {
		config = jsonfile.readFileSync(file);
	}
}

app.get('/off', (req, res) => {

});

app.get('/on', (req, res) => {

});

app.get('/toggle', (req, res) => {

});

app.get('/mode/gif', (req, res) => {
	
});

app.listen(3000, () => {
	console.log('Express server has started');
});
