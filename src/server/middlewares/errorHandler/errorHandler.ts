import { Request, Response, NextFunction } from 'express';

export function handleErrors(fn: (...args: any[]) => Promise<any> | void) {
	return async function(req: Request, res: Response, next: NextFunction) {
		try {
			return await fn(req, res);
		} catch (x) {
			console.log({x});
			next(x);
		}
	};
}