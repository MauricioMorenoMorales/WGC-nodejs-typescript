import * as fs from 'fs';
import { Readable } from 'stream';

const stream = fs.createReadStream('./readedFile.txt', { encoding: 'utf-8' });

// Se ejecutara solo uno de estos, si el primero no se ejecuta, el que está dentro del timeout lo hara
stream.on('data', chunk => console.log('New chunk of data:', chunk));

setTimeout(() => {
	stream.on('data', chunk => console.log('Second chunk of data:', chunk));
}, 2000);

const stream2 = new Readable();

stream2.push('Hello ');
stream2.push('World! ');
stream2.push(null);
//stream2.push('World! '); retorna un error ya que el nul termina el stream

stream2.on('data', chunk => console.log(chunk.toString()));

//! ---
const stream3 = new Readable();

const read = stream3.read.bind(stream3);
stream3.read = function () {
	console.log('read() called');
	return read();
};

stream3.push('Hello ');
stream3.push('World! ');
stream3.push(null);

stream.on('readable', () => {
	let data;
	while (null !== (data = stream.read()))
		console.log('Received', data.toString());
});

stream3.on('data', chunk => console.log(chunk));
