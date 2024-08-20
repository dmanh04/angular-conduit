import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { NewCommentRequest, SingleCommentResponse } from "../models/comment.model"

@Injectable({
    providedIn: "root"
})
export class FavoritesService{

    constructor(private httpClient: HttpClient){

    }

    getComment(slug: string): Observable<SingleCommentResponse>{
        return this.httpClient.get<SingleCommentResponse>(`/articles/${slug}/comments`)
    }

    addComment(slug: string, comment: NewCommentRequest): Observable<SingleCommentResponse>{
        return this.httpClient.post<SingleCommentResponse>(`/articles/${slug}/comments`, {
            comment
        })
    }

    deleteComment(slug: string, id: number): void{
        this.httpClient.delete(`/articles/${slug}/comments/${id}`)
    }
}