import { CookieStore } from '@general-infrastructure/libs/cookieStore';
import { CookieStoreServer } from '@general-infrastructure/stores/cookieStore';
import CookieStoreClient from '@general-infrastructure/stores/cookieStore/client/cookieStore';

export const clientStore = new CookieStore(CookieStoreClient);

export let cookieStore = clientStore;

export const setServerCookie = (req: Request, res: Response) => {
	cookieStore = new CookieStore(new CookieStoreServer(req as any, res as any)) as any;
};
