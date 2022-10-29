import {CookieStore} from '@general-infrastructure/libs/cookieStore';
import { CookieStoreClient, CookieStoreServer } from '@general-infrastructure/stores/cookieStore';

const clientStore = new CookieStore(new CookieStoreClient());

export let cookieStore = clientStore;

export const setServerCookie = (req: Request, res: Response) => {
	cookieStore = new CookieStore(new CookieStoreServer(req as any, res as any));
};
