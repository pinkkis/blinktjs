'use strict';

const wpi = require('wiring-pi');

class Blinkt {
	constructor(options) {
		this.options = options || {};

		this.options.debug && console.log('blinkt.js - ctor::opt', this.options);

		// pins - give defaults
		this.pinDAT = this.options.DAT || 23;
		this.pinCLK = this.options.CLK || 24;

		// Set WPI to GPIO mode
		wpi.setup('gpio');

		// Set pin mode to output
		wpi.pinMode(this.pinDAT, wpi.OUTPUT);
		wpi.pinMode(this.pinCLK, wpi.OUTPUT);

		this.options.debug && console.log('blinkt.js - ctor::opt pin setup');

		this.pixelCount = this.options.pixelCount || 8;
		this.brightness = this.options.defaultBrightness || 0.5;
		this.pixels = [];

		// init pixels
		for (let i = 0; i < this.pixelCount; i++) {
			this.pixels.push([0, 0, 0, this.brightness]);
		}

		this.options.debug && console.log('blinkt.js - ctor::opt pixels', this.pixels);
	}

	_clocker(count) {
		this.options.debug && console.log('blinkt.js - _clocker', count);

		wpi.digitalWrite(this.pinDAT, 0);
		for (var i = 0; i < count; i++) {
			wpi.digitalWrite(this.pinCLK, 1);
			wpi.digitalWrite(this.pinCLK, 0);
		}
	}

	_writeByte(byte) {
		let bit;

		this.pixels.forEach((pixel, i, arr) => {
			bit = ((byte & (1 << (7 - i))) > 0) === true ? wpi.HIGH : wpi.LOW;

			wpi.digitalWrite(this.pinDAT, bit);
			wpi.digitalWrite(this.pinCLK, 1);
			wpi.digitalWrite(this.pinCLK, 0);
		});
	}

	setPixel(i, r, g, b, a) {
		this.options.debug && console.log('blinkt.js - setPixel', arguments);

		if (typeof i === 'number' && i >= 0 && i < this.pixelCount) {
			if (a === undefined) { a = this.brightness; }

			this.pixels[i] = [
				parseInt(r, 10) & 255,
				parseInt(g, 10) & 255,
				parseInt(b, 10) & 255,
				parseInt((31.0 * a), 10) & 0b11111
			];
		}
	}

	setAll(r, g, b, a) {
		this.options.debug && console.log('blinkt.js - setAll', arguments);

		if (a === undefined) { a = this.brightness; }

		this.pixels.forEach((pixel, i, arr) => {
			this.setPixel(i, r, g, b, a);
		});
	}

	rotateLeft() {
		this.options.debug && console.log('blinkt.js - rotateLeft');

		this.pixels.push(this.pixels.shift());
	}

	rotateRight() {
		this.options.debug && console.log('blinkt.js - rotateRight');

		this.pixels.unshift(this.pixels.pop());
	}

	off() {
		this.options.debug && console.log('blinkt.js - off');
		this.setAll(0,0,0,0);
		this.draw();
	}

	draw() {
		this.options.debug && console.log('blinkt.js - draw');
		this._clocker(32);

		this.pixels.forEach((pixel, i, arr) => {
			this._writeByte(0b11100000 | pixel[3]); // Brightness
			this._writeByte(pixel[2]); // Blue
			this._writeByte(pixel[1]); // Green
			this._writeByte(pixel[0]); // Red
		});

		this._clocker(36);
	}

}

module.exports = Blinkt;