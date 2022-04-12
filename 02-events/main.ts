import * as EventEmitter from 'events';

const eventEmitter = new EventEmitter();

eventEmitter.on('event', () => console.log('one'));
eventEmitter.on('event', () => console.log('two'));
eventEmitter.on('event', () => console.log('three'));

eventEmitter.emit('event');

eventEmitter.on('event', () => console.log('event ocurred'));

eventEmitter.on('param event', function (data) {
	console.log(data);
	console.log(this === eventEmitter);
});

eventEmitter.emit('param event', { key: 'value' });

//Removing listeners

function listener() {
	console.log('event ocurred!');
}

eventEmitter.on('remove event', listener);
eventEmitter.emit('remove event');

eventEmitter.removeListener('remove event', listener);

eventEmitter.emit('remove event');

eventEmitter.on('event1', () => {
	setTimeout(() => {
		console.log('first event here!');
		eventEmitter.emit('event2');
	}, 10000);
});

eventEmitter.on('event2', () => {
	setTimeout(() => {
		console.log('second event here!');
		eventEmitter.emit('event3');
	}, 10000);
});

eventEmitter.on('event3', () => {
	setTimeout(() => {
		console.log('third event here!');
		eventEmitter.emit('event1');
	}, 10000);
});

eventEmitter.emit('event1');

class MyEventEmitter extends EventEmitter {
	public counter: number = 0;
}

const myEventEmitter = new MyEventEmitter();

myEventEmitter.once('event', function () {
	console.log(this.counter++);
});

myEventEmitter.emit('event');
myEventEmitter.emit('event');
myEventEmitter.emit('event');
myEventEmitter.emit('event');
