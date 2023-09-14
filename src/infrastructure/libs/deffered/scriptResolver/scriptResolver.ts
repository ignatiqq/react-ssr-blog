type ResolveScriptCallback = (script: string) => void;

export type ScriptResolverType = {
    resolveScript: (script: string) => void;
}

export class ScriptResolver {
	private resolveScriptCallback: ResolveScriptCallback

	constructor(callback: ResolveScriptCallback) {
		this.resolveScriptCallback = callback;
	}

	public resolveScript(script: string) {
		this.resolveScriptCallback(script)
	}
}
