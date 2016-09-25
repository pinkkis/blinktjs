const Blinkt = require('../src/index.js');

const blinkt = new Blinkt();

setTimeout(() => {
	blinkt.setAll(255, 0, 0);
	blinkt.draw();
	console.log('red');
}, 500);

setTimeout(() => {
	blinkt.setAll(0, 255, 0);
	blinkt.draw();
	console.log('green');
}, 1000);

setTimeout(() => {
	blinkt.setAll(0, 0, 255);
	blinkt.draw();
	console.log('blue');
}, 1500);

setTimeout(() => {
	console.log('end');
}, 2000);