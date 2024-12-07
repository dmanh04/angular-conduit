import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseResponse, CommentRequest, CommentResponse } from "../models";


export interface CommentCreateRequest{
    slug: string;
    comment: CommentRequest;
}

export interface CommentDeleteRequest{
    slug: string;
    id: number;
}

@Injectable({
    providedIn: 'root'
})
export class CommentService{
    readonly #http = inject(HttpClient);

    getListComment(slug: string): Observable<BaseResponse<CommentResponse[]>>{
        return this.#http.get<BaseResponse<CommentResponse[]>>(`articles/${slug}/comments`);
    }

    createComment(request: CommentCreateRequest): Observable<BaseResponse<CommentResponse>>{
        return this.#http.post<BaseResponse<CommentResponse>>(`articles/${request.slug}/comments`, request.comment);
    }

    deleteComment(params: CommentDeleteRequest):  Observable<BaseResponse<void>>{
        return this.#http.delete<BaseResponse<void>>(`articles/${params.slug}/comments/${params.id}`);
    }
}