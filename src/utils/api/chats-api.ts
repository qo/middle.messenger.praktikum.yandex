import HTTP from "../http";
import AuthAPIController from "../controllers/auth-api-controller";

const chatsAPIInstance = new HTTP('https://ya-praktikum.tech/api/v2/chats');

export default class ChatsAPI {
    public async getToken(): Promise<unknown> {
        const controller = new AuthAPIController();
        const user = await controller.getUser();
        console.log(user);
        // @ts-ignore
        const id = JSON.parse(user).id;
        console.log(id);
        return chatsAPIInstance.post(
            `/token/${id}`
        );
    }
}