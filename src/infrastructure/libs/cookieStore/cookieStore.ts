import {CookieStoreType, setHandlerOptionsType} from './types';

interface CookieStore extends CookieStoreType {
    store: CookieStoreType;
}

/**
 * Interface class for cookieStore manager in app
 * Interface needs to work with isomorphic stores as with one
 * Also, the interface gives independence from the implementation.
 * Dependency inversion principle
 */

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