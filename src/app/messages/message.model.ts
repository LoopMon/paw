export class Message {
    messageId?: string;
    content: string;
    userId?: string;
    username: string;

    constructor(content: string, username: string, userId?: string,  messageId?: string) {
        this.content = content
        this.username = username
        this.userId = userId
        this.messageId = messageId
    }
}
