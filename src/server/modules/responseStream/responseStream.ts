import { PassThrough } from 'stream';

export type ResponseStreamType = PassThrough;

/**
 * Factory DInversion
 */
export const createResponseStream = (): ResponseStreamType => {
	return new PassThrough();
};