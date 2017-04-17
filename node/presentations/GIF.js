'use strict';

let Common = require('./Common');
let fs = require('fs');
let path = require('path');

let _frameDelay = null;
let _gif = null;
let _gifMetadata = null;
let _loop = null;

module.exports = class GIF extends Common {
	constructor(gifAnimation) {
		super('gif');

		this.frameDelay = 0;
		this.gif = gifAnimation;
		this.loop = 0;
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
		newValue = newValue.replace(/\.(gif|png)$/ig, '');

		if(newValue.trim().length === 0) {
			throw 'A GIF must be specified';
		}

		let displayName = null;
		let gifPath = path.join(__dirname, '../../assets', newValue + '.gif');
		let pngPath = path.join(__dirname, '../../assets', newValue + '.png');
		_gifMetadata = {};

		if(fs.existsSync(gifPath)) {
			displayName = newValue + '.gif';
			_gifMetadata = {
				baseName: newValue,
				displayName: displayName,
				type: 'gif'
			};
		} else if (fs.existsSync(pngPath)) {
			displayName = newValue + '.png';
			_gifMetadata = {
				baseName: newValue,
				displayName: displayName,
				type: 'png'
			};
		} else {
			throw 'The specified file does not exist';
		}

		_gif = displayName;
	}

	get gifMetadata() { return _gifMetadata; }

	get loop() { return _loop; }
	set loop(newValue) {
		if(isNaN(newValue)) {
			_loop = 0;
			return;
		}

		_loop = Math.abs(parseInt(newValue));
	}

	generateFlags() {
		let params = '';

		params += (' --gif=' + this.gif);
		if(this.frameDelay != 0) params += (' --framedelay=' + this.frameDelay);
		if(this.loop != 0) params += (' --loop=' + this.loop);
		params += super.generateFlags();

		return params;
	}

	deserialize(payload) {
		super.deserialize(payload);

		if(!payload || !payload.hasOwnProperty('gif')) return;

		if(payload.gif.hasOwnProperty('frameDelay')) this.frameDelay = payload.gif.frameDelay;
		if(payload.gif.hasOwnProperty('loop')) this.loop = payload.gif.loop;

		if(payload.gif.hasOwnProperty('gif')){
			this.gif = payload.gif.gif;
		} else {
			throw 'A GIF must be specified';
		}
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
