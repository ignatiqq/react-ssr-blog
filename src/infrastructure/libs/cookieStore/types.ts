export type setHandlerOptionsType = {
    expires?: number;
}

export interface CookieStoreType {
    get: (key: string) => string | undefined;
    set: (
        key: string,
        value: string,
        options: setHandlerOptionsType,
    ) => void;
    remove: (key: string) => void;
    has: (key: string) => boolean;
}