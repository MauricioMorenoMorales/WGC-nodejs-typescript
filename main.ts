import * as fs from 'fs';
import * as util from 'util';
import { Writable } from 'stream';

const stream = fs.createWriteStream('./createdFile.txt');

stream.write('Hello world', () => console.log('File created!'));

stream.on('finish', () => console.log('All the data is trasmitted'));

stream.write('Hello ');
stream.write('World!');

const readable = fs.createReadStream('./readedFile.txt');
const writable = fs.createWriteStream('./file1.txt');

readable.pipe(writable);

readable.on('data', chunk => writable.write(chunk));

const writable2 = new Writable();

writable2._write = function (chunk, encoding, next) {
	console.log(chunk.toString());
	next();
};

writable.write('Hello world!');

const writeFile = util.promisify(fs.writeFile);

class WritableFileStream extends Writable {
	public path: string;
	constructor(path: string) {
		super();
		this.path = path;
	}

	_write(chunk: any, encoding: string, next: (error?: Error) => void) {
		writeFile(this.path, chunk)
			.then(() => next())
			.catch(console.log);
	}
}

const writable3 = new WritableFileStream('./file2.txt');

readable.pipe(writable3);

//Standard input

let a: any;
let b: any;

process.stdin.on('data', data => {
	if (a === undefined) a = Number(data.toString());
	else if (b === undefined) {
		b = Number(data.toString());
		console.log(`${a} + ${b} = ${a + b}`);
		process.stdin.pause();
	}
});
