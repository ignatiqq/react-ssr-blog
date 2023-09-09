export interface SerializerType {
    serializeObject: <T extends object>(obj: T) => string;
}