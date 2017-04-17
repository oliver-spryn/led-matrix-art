'use strict';

let _daemon = null;
let _matrix = null;
let _mode = null;
let _power = null;
let _write = null;

module.exports = class Common {
	constructor(mode) {
		this.daemon = true;
		this.matrix = 'adafruit32x32';
		this.mode = mode;
		this.power = 1;
		this.write = false;
	}

	get daemon() { return _daemon; }
	set daemon(newValue) {
		_daemon = newValue == 'true';
	}

	get matrix() { return _matrix; }
	set matrix(newValue) {
		let validMatrices = [
			'16x32',
			'64x16',
			'adafruit32x32',
			'adafruit64x32',
			'adafruit64x64',
			'superpixel'
		];

		if(!validMatrices.includes(newValue.toLowerCase())) {
			throw 'Not a valid matrix';
		}

		_matrix = newValue.toLowerCase();
	}

	get mode() { return _mode; }
	set mode(newValue) {
		let validModes = [
			'gif'
		];

		if(!validModes.includes(newValue.toLowerCase())) {
			throw 'Not a valid operating mode';
		}

		_mode = newValue.toLowerCase();
	}

	get power() { return _power; }
	set power(newValue) {
		let validPowerStates = [
			0,
			1
		];

		if(isNaN(newValue) || !validPowerStates.includes(parseInt(newValue))) {
			throw 'Power may only be on [1] or off [0]';
		}

		_power = parseInt(newValue);
	}

	get write() { return _write; }
	set write(newValue) {
		_write = newValue == 'true';
	}

	generateFlags() {
		let params = '';
		
		params += (' --' + this.matrix);
		if(this.daemon) params += ' --daemon';
		if(this.write) params += ' --write';

		return params;
	}

	deserialize(payload) {
		if(!payload ||
		!payload.hasOwnProperty('common') ||
		!payload.common.hasOwnProperty('daemon') ||
		!payload.common.hasOwnProperty('matrix') ||
		!payload.common.hasOwnProperty('mode') ||
		!payload.common.hasOwnProperty('power') ||
		!payload.common.hasOwnProperty('write')) {
			throw 'The payload is malformed';
		}

		this.daemon = payload.common.daemon;
		this.matrix = payload.common.matrix;
		this.mode = payload.common.mode;
		this.power = payload.common.power;
		this.write = payload.common.write;
	}

	serialize() {
		return {
			common: {
				daemon: this.daemon,
				matrix: this.matrix,
				mode: this.mode,
				power: this.power,
				write: this.write
			}
		};
	}
};
