import { DefferedClientStoreType } from '@general-infrastructure/libs/deffered/defferedStore/defferedStore';

type WindowHydrateStateType = () => void | boolean;

declare global {
    interface Window {
        _DEFFERED_STORE: DefferedClientStoreType;
        _HYDRATE: WindowHydrateStateType;
        __REACT_QUERY_STATE__: string;
    }
}

declare module '*.module.css';
declare module '*.module.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.webp';

// webapck

declare module '__webpack_init_sharing__';

// microfrontends

declare module 'homePage/*';