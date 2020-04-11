export class Comment {
    id?: number;
    createdAt?: Date;
    createdBy?: string;
    type?: string;
    content?: string;
    postId?: number;
    subComments?: Array<Comment>;
    isComment?: boolean;
    parenComment?: Comment;
    subContent?: string;
}
