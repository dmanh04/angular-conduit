import { Profile } from "./profile.model";

export interface Comment{
    id: number,
    createdAt: Date,
    updatedAt: Date,
    body: string,
    author: Profile
}
export interface SingleCommentResponse{
    comment: Comment
}
export interface MultipleCommentResponse{
    comment: Comment[]
}
export interface NewComment{
    body: string
}
export interface NewCommentRequest{
    comment: NewComment
}
