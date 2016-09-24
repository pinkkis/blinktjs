const Blinkt = require('../src/index.js');
const blinkt = new Blinkt({defaultBrightness: 0.3, colorFormat: 'HSV'});

let timer, i = 0;

blinkt.off();

timer = setInterval(() => {
	i++;
	blinkt.setPixel(3, i * 3 % 360, 100, 100);
	blinkt.draw();
}, 50);

setTimeout(() => {
	clearInterval(timer);
	blinkt.off();
	console.log('end');
}, 5000);