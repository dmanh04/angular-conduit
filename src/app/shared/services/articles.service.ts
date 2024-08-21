import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { MultipleArticleResponse, NewArticleRequest, SingleArticleResponse, UpdateArticleRequest } from "../models/article.model"
import { api_prefix } from "../constants/api.constant"


@Injectable({
    providedIn: "root"
})
export class ArticleService {

    constructor(private httpClient: HttpClient) {}

    getArticlesFeed(limit: number, offset: number): Observable<MultipleArticleResponse> {
        return this.httpClient.get<MultipleArticleResponse>(`${api_prefix}/articles/feed`, {
            params: {
                limit,
                offset
            }
        })
    }

    getArticles(tag: string, author: string, favorited: string, limit: number, offset: number): Observable<MultipleArticleResponse> {
        return this.httpClient.get<MultipleArticleResponse>(`${api_prefix}/articles`, {
            params: {
                tag,
                author,
                favorited,
                limit,
                offset
            }
        })
    }

    addArticle(articles: NewArticleRequest): Observable<SingleArticleResponse> {
        return this.httpClient.post<SingleArticleResponse>(`${api_prefix}/article`, {
            articles
        })
    }

    getArticleBySlug(slug: string): Observable<SingleArticleResponse> {
        return this.httpClient.get<SingleArticleResponse>(`${api_prefix}/articles/${slug}`)
    }

    updateArticle(slug: string, articles: UpdateArticleRequest): Observable<SingleArticleResponse> {
        return this.httpClient.post<SingleArticleResponse>(`${api_prefix}/articles/${slug}`, {
            articles
        })
    }

    deleteArticle(slug: string): void {
        this.httpClient.delete(`${api_prefix}/articles/${slug}`)
    }

}