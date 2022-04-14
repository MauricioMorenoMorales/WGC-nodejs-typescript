import { StringDecoder } from 'string_decoder';
import * as fs from 'fs';
import * as util from 'util';

const buffer1 = new Buffer(5);

buffer1[0] = 255;
console.log(buffer1[0]);

buffer1[1] = 256;
console.log(buffer1[1]);

buffer1[2] = 260;
console.log(buffer1[2]);
console.log(buffer1[2] === 260 % 256);

buffer1[3] = 516;
console.log(buffer1[3]); // 4
console.log(buffer1[3] === 516 % 256); // true

// Creates a Buffer of length 5 filled with 1
const buffer2 = Buffer.alloc(5, 1);

//Creates a buffer containing 1,2,3
const buffer3 = Buffer.from([1, 2, 3]);

const buffer4 = Buffer.from('Hello world!');

console.log(buffer4.toString());

const buffers = [
	Buffer.from('Hello '),
	Buffer.from([0b11110000, 0b10011111]),
	Buffer.from([0b10001100, 0b10001110]),
	Buffer.from(' world!'),
];

// De este modo no funcionaría ya que necesitas un string decoder
let result = '';
for (const buffer of buffers) result += buffer.toString();
console.log(result);

//De este modo si funcionaria, además la logica es la misma pero con un reduce
const decoder = new StringDecoder('utf-8');
console.log(
	buffers.reduce(
		(accumulator, current) => `${accumulator}${decoder.write(current)}`,
		'',
	),
);

//! Lee un archivo

const readFile = util.promisify(fs.readFile);

readFile('./readedFile.txt')
	.then(content => {
		console.log(content instanceof Buffer); // true
		console.log(content.toString());
	})
	.catch(console.log);
