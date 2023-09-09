import { SerializerType } from './type';

/**
 * Facade for DI
 */
export class Serializer implements SerializerType {
	constructor(readonly serializer: SerializerType) {}

	serializeObject<T extends object>(obj: T) {
		return this.serializer.serializeObject(obj);
	}

}