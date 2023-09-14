import { Serializer as SerializerFacade } from './serializerFacade';

const serializerImpl = {
	serializeObject: JSON.stringify,
};

export const serializer = new SerializerFacade(serializerImpl);