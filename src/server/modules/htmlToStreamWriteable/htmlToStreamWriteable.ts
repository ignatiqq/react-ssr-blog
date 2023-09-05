import { ServerResponseTaskManagerType } from '@server/infrastructure/taskManager/taskManager';
import {Writable} from 'stream';
import { ResponseStreamType } from '../responseStream/responseStream';

export class HtmlToStreamWriteable extends Writable {
	constructor(readonly responseStream: ResponseStreamType, readonly taskManager: ServerResponseTaskManagerType) {
		super();
	}

	_write(htmlChunk: any, encoding: BufferEncoding, callback: (error?: Error) => void): void {
		const html = htmlChunk.toString('utf-8');

		console.log({html, htmlChunk});
		// set pool of renderToPipeableStream chunks
		// to the stream Task Manager
		// passed callback should write to response stream
		this.taskManager.push(async () => {
			this.responseStream.push(html);
		});

		callback();
	}
}