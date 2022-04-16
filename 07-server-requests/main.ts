import { createServer, IncomingMessage, ServerResponse } from 'http';

const port: number = 5000;

interface Post {
	title: string;
	content: string;
}

const posts: Array<Post> = [
	{ title: 'Lorem ipsum', content: 'Dolor sit amet' },
];

const getJSONDataFromRequestStream = <T>(
	request: IncomingMessage,
): Promise<T> =>
	new Promise(resolve => {
		const chunks: any = [];
		request.on('data', chunk => chunks.push(chunk));
		request.on('end', () =>
			resolve(JSON.parse(Buffer.concat(chunks).toString())),
		);
	});

const server = createServer(
	(request: IncomingMessage, response: ServerResponse) => {
		switch (request.url) {
			case '/posts': {
				response.setHeader('Content-Type', 'application/json');
				if (request.method === 'GET') response.end(JSON.stringify(posts));
				else if (request.method === 'POST')
					getJSONDataFromRequestStream<Post>(request).then(post => {
						posts.push(post);
						response.end(JSON.stringify(post));
					});
				break;
			}
			case '/upload': {
				if (request.method === 'POST') {
					const chunks: any = [];
					request.on('data', chunk => chunks.push(chunk));
					request.on('end', () =>
						response.end(Buffer.concat(chunks).toString()),
					);
				}
				break;
			}
			default: {
				response.statusCode = 404;
				response.end('Page not found');
			}
		}
	},
);

server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
