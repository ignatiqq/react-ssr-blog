import {CookieStoreType, setHandlerOptionsType} from './types';

interface CookieStore extends CookieStoreType {
    store: CookieStoreType;
}

class CookieStore implements CookieStore {

	store: CookieStoreType;

	constructor(store: CookieStore) {
		this.store = store;
	}

	get(key: string) {
		return this.store.get(key);
	}

	set(key: string, value: string, options?: setHandlerOptionsType) {
		this.store.set(key, value, options || {});
	}

	remove(key: string) {
		this.store.remove(key);
	}

	has(key: string) {
		return this.store.has(key);
	}

}

export default CookieStore;