import { DefferedStoreType } from '@general-infrastructure/libs/defferedStore/defferedStore';

type WindowHydrateStateType = () => void | boolean;

declare global {
    interface Window { _DEFFERED_STORE: DefferedStoreType; _HYDRATE: WindowHydrateStateType}
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