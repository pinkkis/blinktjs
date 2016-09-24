'use strict';

const wpi = require('wiring-pi');

class Blinkt {
	constructor(options) {
		options = options || {};

		// pins - give defaults
		this.pinDAT = options.DAT || 23;
		this.pinCLK = options.CLK || 24;

		// Set WPI to GPIO mode
		wpi.setup('gpio');

		// Set pin mode to output
		wpi.pinMode(this.pinDAT, wpi.OUTPUT);
		wpi.pinMode(this.pinCLK, wpi.OUTPUT);

		this.pixelCount = options.pixelCount || 8;
		this.brightness = options.defaultBrightness || 0.5;
		this.pixels = [];

		// init pixels
		this.setAll(0, 0, 0);
	}

	_clocker(count) {
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
		if (typeof i === 'number' && i >= 0 && i < this.pixelCount) {
			if (a === 'undefined') { a = this.defaultBrightness; }

			this.pixels[i] = [r, g, b, a];
		}
	}

	setAll(r, g, b, a) {
		if (a === 'undefined') { a = this.defaultBrightness; }

		this.pixels.forEach((pixel, i, arr) => {
			this.setPixel(i, r, g, b, a);
		});
	}

	rotateLeft() {
		this.pixels.push(this.pixels.shift());
	}

	rotateRight() {
		this.pixels.unshift(this.pixels.pop());
	}

	draw() {
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