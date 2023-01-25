export default interface IMessage {
    isMine: boolean;
    type: "text" | "image";
    content: string;
    time: string;
}