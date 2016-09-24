const Blinkt = require('../src');

var blinkt = new Blinkt();

setTimeout(() => {
	blinkt.setAll(250, 0, 0);
}, 500);

setTimeout(() => {
	blinkt.setAll(0, 250, 0);
}, 1000);

setTimeout(() => {
	blinkt.setAll(0, 0, 250);
}, 1500);

setTimeout(() => {
	blinkt.setAll(0, 0, 0);
}, 2000);