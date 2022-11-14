import HTTP from "./http";
import BaseAPI from "./base-api";

const chatAPIInstance = new HTTP('api/v1/chats/');

export default class ChatAPI extends BaseAPI {
    create() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.post('/', { data: { 'title': 'string' }});
    }
    request() {
        // Здесь уже не нужно писать полный путь /api/v1/chats/
        return chatAPIInstance.get('/full');
    }
    update() { throw new Error('Not implemented'); };
    delete() { throw new Error('Not implemented'); };
}