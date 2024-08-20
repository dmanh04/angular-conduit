import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SingleArticleResponse } from "../models/article.model";
import { Observable } from "rxjs";
import { api_prefix } from "../constants/api.constant";


@Injectable({
    providedIn: "root"
})
export class FavoritesService {

    constructor(private httpClient: HttpClient) {

    }

    getTags(slug: string): Observable<SingleArticleResponse> {
        return this.httpClient.get<SingleArticleResponse>(`${api_prefix}/articles/${slug}/favorite`)
    }

    deleteTags(slug: string): Observable<SingleArticleResponse> {
        return this.httpClient.delete<SingleArticleResponse>(`${api_prefix}/articles/${slug}/favorite`)
    }
}