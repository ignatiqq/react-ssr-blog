import type { CookieStoreType, setHandlerOptionsType } from '@general-infrastructure/libs/cookieStore';

type cookieType = {
    [key: string]: string;
}

interface ResponseWithCookies extends Response {
    cookie: (key: string, value: string, options: setHandlerOptionsType) => void;
    clearCookie: (key: string) => void;
}

interface RequestWithCookies extends Request {
    cookies: cookieType;
}

class CookieStore implements CookieStoreType {

	response: ResponseWithCookies;
	req: RequestWithCookies;

	constructor(req: RequestWithCookies, res: ResponseWithCookies) {
		this.req = req;
		this.response = res;
	}

	get(key: string) {
		return this.req.cookies[key] || undefined;
	}

	set(key: string, value: string, options: setHandlerOptionsType) {
		this.response.cookie(key, value, options);
	}

	has(key: string) {
		return !!this.req.cookies[key];
	}

	remove(key: string) {
		this.response.clearCookie(key);
	}

}

export default CookieStore;