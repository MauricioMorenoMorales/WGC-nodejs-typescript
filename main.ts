import * as fs from 'fs';

// timers phase
console.time('setTimeout');
setTimeout(() => {
	console.log('Timer went off');
	console.timeEnd('setTimeout');
}, 100);

setTimeout(() => {
	for (let i = 0; i < 1000; ++i) {}
}, 95);

let i = 0;
const id = setInterval(() => {
	console.log(++i);
	if (i > 3) clearInterval(id);
}, 50);

//Check phase
setTimeout(() => {
	console.log('set timeout');
}, 0);
setImmediate(() => {
	console.log('set immediate');
});

fs.readFile('./readedFile.txt', () => {
	setTimeout(() => {
		console.log('set timeout readed file');
	}, 0);
	setImmediate(() => {
		console.log('set immediate readfile');
	});
});
