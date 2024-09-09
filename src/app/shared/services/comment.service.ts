import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { NewCommentRequest, SingleCommentResponse } from "../models/comment.model"
import { api_prefix } from "../constants/api.constant"


@Injectable({
    providedIn: "root"
})
export class FavoritesService {

    constructor(private httpClient: HttpClient) {}

    getComment(slug: string): Observable<SingleCommentResponse> {
        return this.httpClient.get<SingleCommentResponse>(`${api_prefix}/articles/${slug}/comments`)
    }

    addComment(slug: string, comment: NewCommentRequest): Observable<SingleCommentResponse> {
        return this.httpClient.post<SingleCommentResponse>(`${api_prefix}/articles/${slug}/comments`, {
            comment
        })
    }

    deleteComment(slug: string, id: number): void {
        this.httpClient.delete(`${api_prefix}/articles/${slug}/comments/${id}`)
    }
}