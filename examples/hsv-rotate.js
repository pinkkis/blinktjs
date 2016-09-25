const Blinkt = require('../src/index.js');
const blinkt = new Blinkt({defaultBrightness: 0.3, colorFormat: 'HSV'});

let timer, i = 0;

// clear any old lights
blinkt.off();

timer = setInterval(() => {
	i++;
	for (let p = 0; p < 8; p++) {
		blinkt.setPixel(3, ((p * 10) + (i * 5)) % 360, 100, 100);
	}
	blinkt.draw();
}, 25);

setTimeout(() => {
	clearInterval(timer);
	console.log('end');
}, 5000);
