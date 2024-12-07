import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ArticleReposne, BaseResponse } from "../models";


@Injectable({
    providedIn: 'root'
})
export class FavoriteService {

    readonly #http = inject(HttpClient);

    addFavorite(slug: string): Observable<BaseResponse<ArticleReposne>>{
        return this.#http.post<BaseResponse<ArticleReposne>>(`articles/${slug}/favorite`, {});
    }

    unFavorite(slug: string): Observable<BaseResponse<ArticleReposne>>{
        return this.#http.delete<BaseResponse<ArticleReposne>>(`articles/${slug}/favorite`);
    }
}