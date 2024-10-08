import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ArticleReposne,
  BaseResponse,
  PageReponse,
  PagingQueryParams,
} from '../models';
import { Observable } from 'rxjs';

export interface GetArticleQueryParams extends PagingQueryParams {
  tag?: string[];
  author?: string;
  title?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticleSerice {
  readonly #http = inject(HttpClient);

  findAllArticleByFilter(
    queryParams: GetArticleQueryParams,
  ): Observable<BaseResponse<PageReponse<ArticleReposne>>> {
    return this.#http.get<BaseResponse<PageReponse<ArticleReposne>>>(
      'articles',
      {
        params: {
          ...queryParams,
        },
      },
    );
  }
}
