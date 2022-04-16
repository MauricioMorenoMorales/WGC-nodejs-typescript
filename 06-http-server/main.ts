import { createReadStream, createWriteStream } from 'fs';
import { IncomingHttpHeaders, request } from 'http';
import { RequestOptions } from 'https';

const fileStream = createWriteStream('./file.txt');

const req = request(
	{
		host: 'jsonplaceholder.typicode.com',
		path: '/todos/1',
		method: 'GET',
	},
	response => {
		let chunks: any = [];
		response.on('data', chunk => {
			chunks.push(chunk);
		});
		response.on('end', () => {
			const result = Buffer.concat(chunks).toString();
			// console.log(result);
		});
	},
);

req.end();

// o de esta forma lo puedes hacer

interface Response {
	data: object;
	headers: IncomingHttpHeaders;
}

export const performRequest = (options: RequestOptions) =>
	new Promise((resolve, reject) => {
		request(options, function (response) {
			const { statusCode, headers } = response;
			if (statusCode >= 300) reject(new Error(response.statusMessage));

			const chunks: any = [];
			response.on('data', chunk => chunks.push(chunk));
			response.on('end', () => {
				const data = Buffer.concat(chunks).toString();
				const result: Response = {
					data: JSON.parse(data),
					headers,
				};
				resolve(result);
			});
		}).end();
	});

performRequest({
	host: 'jsonplaceholder.typicode.com',
	path: '/todos/1',
	method: 'GET',
})
	.then(console.log)
	.catch(console.log);

// http.clientRequest

const req2 = request(
	{
		host: 'localhost',
		port: '5000',
		path: '/posts',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	},
	response => console.log(response.statusCode),
);

req2.write(
	JSON.stringify({
		author: 'Marcin',
		title: 'Lorem ipsum',
		content: 'Dolor sit amet',
	}),
);

req2.end();
