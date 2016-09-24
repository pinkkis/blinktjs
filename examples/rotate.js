const Blinkt = require('../src/index.js');
const blinkt = new Blinkt({defaultBrightness: 0.3});

let timer;

setTimeout(() => {
	blinkt.setAll(255, 0, 0);
	blinkt.draw();
	console.log('red');
}, 500);

setTimeout(() => {
	blinkt.setPixel(3, 255, 255, 0);
	blinkt.draw();
	console.log('yellow dot');
}, 1000);

timer = setInterval(() => {
	blinkt.rotateLeft();
	blinkt.draw();
	console.log('rotate');
}, 100);

setTimeout(() => {
	clearInterval(timer);
	blinkt.off();
	console.log('end');
}, 5000);