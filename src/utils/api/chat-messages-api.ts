import HTTP from './http';
import BaseAPI from "./base-api";

const chatMessagesAPIInstance = new HTTP('api/v1/messages');

export default class ChatMessagesAPI extends BaseAPI {
    request(data: { id: string }) {
        return chatMessagesAPIInstance.get(`/${data.id}`);
    }
    create() { throw new Error('Not implemented'); };
    update() { throw new Error('Not implemented'); };
    delete() { throw new Error('Not implemented'); };
}