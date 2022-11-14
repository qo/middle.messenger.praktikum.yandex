export default abstract class BaseAPI {
    abstract create(data?: Record<string, string>): Promise<unknown> | void;
    abstract request(data?: Record<string, string>): Promise<unknown> | void;
    abstract update(data?: Record<string, string>): Promise<unknown> | void;
    abstract delete(data?: Record<string, string>): Promise<unknown> | void;
}
