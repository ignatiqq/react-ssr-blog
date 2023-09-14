import { wrapScript } from "@general-infrastructure/libs/attrs/attrs";
import { DEFFERED_STORE_CONSTANT_NAME } from "./defferedStore"

export const createDefferedScript = (actionName: string, serializedData: string) => {
    return `window.${DEFFERED_STORE_CONSTANT_NAME}.get('${actionName}').set(${serializedData})`;
}

export const createResolvedDefferedScript = (actionName: string, serializedData: string) => {
    // we should use in the cases when client not created deferred by key
    // at the deffered store (it will trigger error without it because of undefined)
    const presaveScript = `
        if(!window.${DEFFERED_STORE_CONSTANT_NAME}.get('${actionName}')) {
            ${createDefferedScript(actionName, serializedData)}
        }
    `;
    return wrapScript(presaveScript + `\n window.${DEFFERED_STORE_CONSTANT_NAME}.get('${actionName}').resolve(${serializedData})`);
}
