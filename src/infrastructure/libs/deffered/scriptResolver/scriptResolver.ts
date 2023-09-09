import { Response } from 'express';

export type ScriptResolverType = {
    resolveScript: (scriptPlainText: string) => void;
}

export class ScriptResolver {
	private responseStream: Response;

	constructor(res: Response) {
		this.responseStream = res;
	}

	public resolveScript(scriptText: string) {
		this.responseStream.write(scriptText);
	}
}
