import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import {
  ArticleReposne,
  BaseResponse,
  PageReponse,
} from '../../../shared/models';
import { inject, Injectable, Signal } from '@angular/core';
import { exhaustMap } from 'rxjs';
import { ArticleSerice, GetArticleQueryParams } from '../../../shared/services';

interface ArticleState {
  articles: ArticleReposne[];
  isLoading: boolean;
}

const initArticleState: ArticleState = {
  articles: [],
  isLoading: false,
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
    exhaustMap((params) => {
      this.patchState({
        isLoading: true,
      });
      return this.#articleService.findAllArticleByFilter(params).pipe(
        tapResponse({
          next: (res: BaseResponse<PageReponse<ArticleReposne>>) => {
            console.log(res);
            this.patchState({
              articles: res.data.items,
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
