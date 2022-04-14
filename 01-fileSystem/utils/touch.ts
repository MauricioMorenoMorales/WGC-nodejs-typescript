import * as fs from 'fs';
import * as util from 'util';

// Así se haría con callbacks pero puedes hacerlo mejor con promesas
/*
fs.writeFile('./newFile.txt', null, error => {
	if (error) console.log(error);
	else console.log('File created successfuly');
});
*/

const writeFile = util.promisify(fs.writeFile);

export default function touch(path: string): void {
	writeFile(path, '')
		.then(() => console.log('File created successfuly'))
		.catch(console.log);
}
