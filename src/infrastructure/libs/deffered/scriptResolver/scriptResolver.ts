import { wrapScript } from '@general-infrastructure/libs/attrs/attrs';
import { HtmlToStreamWriteable } from '@server/modules/htmlToStreamWriteable/htmlToStreamWriteable';
import { Response } from 'express';
import { DEFFERED_STORE_CONSTANT_NAME } from '../defferedStore/defferedStore';

export type ScriptResolverType = {
    resolveScript: (actionName: string, promiseData: string) => void;
}

export class ScriptResolver {
	private responseStream: Response;
	private htmlResponseWriteable: HtmlToStreamWriteable;

	constructor(res: Response, htmlResponseWriteable: HtmlToStreamWriteable) {
		this.responseStream = res;
		this.htmlResponseWriteable = htmlResponseWriteable;
	}

	public resolveScript(actionName: string, promiseData: string) {
		const script = wrapScript(`window.${DEFFERED_STORE_CONSTANT_NAME}.${actionName}.resolve(${promiseData})`);
		// @ts-ignore @TODO remove ignore by adding type
		this.htmlResponseWriteable.push(script);
	}
}
