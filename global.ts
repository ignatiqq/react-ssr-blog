import { WindowDefferedStoreType } from '@general-infrastructure/libs/deffered/defferedStore/defferedStore';

type WindowHydrateStateType = () => void | boolean;

declare global {
    interface Window {
        _DEFFERED_STORE: WindowDefferedStoreType;
        _HYDRATE: WindowHydrateStateType;
        __REACT_QUERY_STATE__: string;
    }
}