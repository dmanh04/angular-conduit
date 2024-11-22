import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import {
  ArticleReposne,
  BaseResponse,
  PageReponse,
} from '../../../shared/models';
import { inject, Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { ArticleSerice, GetArticleQueryParams } from '../../../shared/services';

interface ArticleState {
  articles: ArticleReposne[];
  isLoading: boolean;
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

const initArticleState: ArticleState = {
  articles: [],
  isLoading: false,
  totalPages: 0,
  totalElements: 0,
  page: 1,
  size: 10,
};

@Injectable()
export class ListArticleStore
  extends ComponentStore<ArticleState>
  implements OnStoreInit
{
  readonly #articleService = inject(ArticleSerice);

  ngrxOnStoreInit() {
    this.setState(initArticleState);
  }

  readonly getArticles$ = this.select((state) => {
    return state.articles;
  });

  readonly getLoading$ = this.select((state) => {
    return state.isLoading;
  });

  readonly findAllArticleByFilter = this.effect<GetArticleQueryParams>(
    switchMap((params) => {
      this.patchState({
        isLoading: true,
      });
      return this.#articleService.findAllArticleByFilter(params).pipe(
        tapResponse({
          next: (res: BaseResponse<PageReponse<ArticleReposne>>) => {
            this.patchState({
              articles: res.data.items,
              page: res.data.page,
              size: res.data.size,
              totalPages: res.data.totalPages,
              totalElements: res.data.totalElements,
            });
          },
          error: (error) => {
            console.log(error);
          },
          finalize: () => {
            this.patchState({
              isLoading: false,
            });
          },
        }),
      );
    }),
  );
}
