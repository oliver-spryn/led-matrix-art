'use strict';

let Display = require('./Display');
let fs = require('fs');
let path = require('path');

let _frameDelay = 0;
let _gif = '';
let _loop = 0;

module.exports = class GIF extends Display {
	constructor(gifAnimation) {
		super('gif');

		this.gif = gifAnimation;
	}

	get frameDelay() { return _frameDelay; }
	set frameDelay(newValue) {
		if(isNaN(newValue)) {
			_frameDelay = 0;
			return;
		}

		newValue = parseInt(newValue);

		if(newValue < 0 || newValue > 1000) {
			throw 'The frame delay must be a number between 0 and 1000, inclusive';
		}

		_frameDelay = newValue;
	}

	get gif() { return _gif; }
	set gif(newValue) {
		let displayPath = null;
		let gifPath = path.join(__dirname, '../../assets', newValue + '.gif');
		let pngPath = path.join(__dirname, '../../assets', newValue + '.png');

		if(fs.existsSync(gifPath)) {
			displayPath = gifPath;
		} else if (fs.existsSync(pngPath)) {
			displayPath = pngPath;
		} else {
			throw 'The specified file does not exist';
		}

		_gif = displayPath;
	}

	get loop() { return _loop; }
	set loop(newValue) {
		if(isNaN(newValue)) {
			_loop = 0;
			return;
		}

		_loop = Math.abs(parseInt(newValue));
	}

	generateFlags() {
		let params = super.generateFlags();

		if(this.frameDelay != 0) params.push('--framedelay=' + this.frameDelay);
		params.push('--gif=' + this.gif);
		if(this.loop != 0) params.push('--loop=' + this.loop);

		return params;
	}

	deserialize(payload) {
		super.deserialize(payload);

		if(!payload ||
		!payload.hasOwnProperty('gif') ||
		!payload.gif.hasOwnProperty('frameDelay') ||
		!payload.gif.hasOwnProperty('gif') ||
		!payload.gif.hasOwnProperty('loop')) {
			throw 'The payload is malformed';
		}

		this.frameDelay = payload.gif.frameDelay;
		this.gif = payload.gif.gif;
		this.loop = payload.gif.loop;
	}

	serialize() {
		let json = super.serialize();

		json.gif = {
			frameDelay: this.frameDelay,
			gif: this.gif,
			loop: this.loop
		};

		return json;
	}
};
