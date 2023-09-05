import { ServerResponseTaskManager, ServerResponseTaskManagerType } from '@server/infrastructure/taskManager/taskManager';

/**
 * Factory DInversion
 */
export const createResponseTaskManager = (): ServerResponseTaskManagerType => {
	return new ServerResponseTaskManager();
};