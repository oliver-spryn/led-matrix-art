'use strict';

let express = require('express');
let app = express();

app.get('/', (req, res) => {
	res.send('Sup, earth');
});

app.get('/off', (req, res) => {

});

app.get('/on', (req, res) => {

});

app.get('/toggle', (req, res) => {

});

app.listen(3000, () => {
	console.log('Express server has started');
});
