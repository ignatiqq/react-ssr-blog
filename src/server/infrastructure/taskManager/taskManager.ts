
type ServerResponseTask = () => Promise<any>;

export type ServerResponseTaskManagerType = {
    push(task: ServerResponseTask): void;
    processQueue(): void;
    closeQueue(): Promise<any>;
  }


export class ServerResponseTaskManager implements ServerResponseTaskManagerType {
	private tasks: ServerResponseTask[] = [];
	private processedTasks: Promise<any>[] = [];
	private status: 'idle' | 'running' | 'closed' = 'idle';

	push(task: ServerResponseTask) {
		if (this.status === 'closed') {
			return;
		}

		this.tasks.push(task);

		if (this.status === 'running') {
			this.processQueue();
		}
	}

	processQueue() {
		if (this.status === 'closed') {
			return;
		}

		this.status = 'running';

		while (this.tasks.length > 0 && this.status === 'running') {
			const task = this.tasks.shift();

			this.processedTasks.push(task());
		}
	}

	closeQueue() {
		return Promise.all(this.processedTasks).finally(() => {
			this.status = 'closed';
		});
	}
}
