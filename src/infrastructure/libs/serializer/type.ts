import { Serializer as SerializerFacade } from './serializerFacade';

export interface SerializerType {
    serializeObject: <T extends object>(obj: T) => string;
}

const serializerImpl = {
	serializeObject: JSON.stringify,
};

export const Serializer = new SerializerFacade(serializerImpl);