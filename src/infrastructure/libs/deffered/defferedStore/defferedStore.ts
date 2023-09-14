import { DefferedType } from '../defferedPromise/defferedPromise';
import { DefferedStoreServer } from './serverDefferedStore';
import { DefferdStoreClient } from './clientDefferedStore';

export const DEFFERED_STORE_CONSTANT_NAME = '_DEFFERED_STORE';

type DefferedStoreType = {
    // any should be typed
    getByActionName: (actionName: string) => DefferedType<any> | null;
    setAction: (actionName: string) => DefferedType<any>;
}

export type DefferedClientStoreType = DefferedStoreType;
export type WindowDefferedStoreType =  Map<string, DefferedType<any>>;
export type DefferedServerStoreType = {
	createActionData: <T extends object>(actionName: string, getData: () => Promise<T>) => void;
} & DefferedStoreType;

export type IsomorphicDefferedStoreType = DefferedClientStoreType | DefferedServerStoreType;

export {DefferedStoreServer, DefferdStoreClient};