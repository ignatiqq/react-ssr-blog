import { ReactElement } from 'react';

type LoadModuleReturnType = () => any;

/**
* loadModule is a function which return webpack require MicroFrontend module by MFP name and module
* @param {string} MFPname ModuleFederationPlugin name which vared in MFP {name: '*'}
* @param {string} MFPmodule ModuleFederationPlugin module path which vared in MFP {exposes: {'./*modulepath'}}
*/
function loadModule(MFPname: string, MFPmodule: string): LoadModuleReturnType {
	return async () => {
		// Initializes the shared scope.
		await __webpack_init_sharing__('default');
		// @ts-ignore
		const container: {init: (param: any) => Promise<any>} = window[MFPname];
		await container.init(__webpack_share_scopes__.default);
		// @ts-ignore
		const factory = await window[MFPname].get(MFPmodule);
		const Module = factory();
		return Module;
	};
}

export default loadModule;