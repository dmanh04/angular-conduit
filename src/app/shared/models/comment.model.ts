import { AuthorResponse } from './user.model';

export interface CommentRequest {
  body: string;
}

export interface CommentResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: AuthorResponse;
}
