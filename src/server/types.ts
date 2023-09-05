import { ServerResponseTaskManager, ServerResponseTaskManagerType } from './infrastructure/taskManager/taskManager';
import { ResponseStreamType } from './modules/responseStream/responseStream';

export interface ErrorType {
    message: string;
    fileName: string;
    lineNumber: string;
}

export interface ResponseManagersType {
    taskManager: ServerResponseTaskManagerType;
    responseStream: ResponseStreamType;
}