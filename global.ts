import { DefferedClientStoreType } from '@general-infrastructure/libs/deffered/defferedStore/defferedStore';

type WindowHydrateStateType = () => void | boolean;

declare global {
    interface Window {
        _DEFFERED_STORE: DefferedClientStoreType;
        _HYDRATE: WindowHydrateStateType;
        __REACT_QUERY_STATE__: string;
    }
}