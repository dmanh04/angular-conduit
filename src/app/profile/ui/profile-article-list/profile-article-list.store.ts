import { computed, inject, Injectable } from '@angular/core';
import { ArticleReposne } from '../../../shared/models';
import { ARTICLE_TYPE, ArticleType } from './profile-article-list.di';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '../../../shared/constants';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import {
  ArticleSerice,
  FavoriteService,
  GetArticleQueryParams,
} from '../../../shared/services';
import { defer, exhaustMap, switchMap } from 'rxjs';

interface ProfileArticleList {
  articles: ArticleReposne[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
  articleType: ArticleType;
}

const initProfileArticleList: ProfileArticleList = {
  articles: [],
  totalPages: 0,
  totalElements: 0,
  page: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
  articleType: ARTICLE_TYPE.MyArticle,
};

export interface QueryArticleByAuthor {
  query: GetArticleQueryParams;
  type: ArticleType;
}

@Injectable()
export class ProfileArticleListStore
  extends ComponentStore<ProfileArticleList>
  implements OnStoreInit
{
  readonly #articleService = inject(ArticleSerice);

  readonly #favoriteService = inject(FavoriteService);

  ngrxOnStoreInit() {
    this.setState(initProfileArticleList);
  }

  readonly page$ = this.select((state) => state.page);

  readonly currentPage = computed(() => this.state().page);

  readonly size$ = this.select((state) => state.size);

  readonly totalPages$ = this.select((state) => state.totalPages);

  readonly totalElements$ = this.select((state) => state.totalElements);

  readonly articles$ = this.select((state) => state.articles);

  readonly getMyArticleByAuthor = this.effect<QueryArticleByAuthor>(
    switchMap((params) => {
      return defer(() => {
        if (params.type === ARTICLE_TYPE.MyArticle) {
          return this.#articleService.findAllArticleByFilter(params.query);
        } else {
          return this.#articleService.findAllArticleByFilterFavorites(
            params.query,
          );
        }
      }).pipe(
        tapResponse({
          next: (res) => {
            this.patchState({
              articles: res.data.items,
              page: res.data.page,
              size: res.data.size,
              totalPages: res.data.totalPages,
              totalElements: res.data.totalElements,
            });
          },
          error: (e) => {
            console.log(e);
          },
        }),
      );
    }),
  );

  readonly toogleFavorite = this.effect<{
    article: ArticleReposne;
    query: QueryArticleByAuthor;
  }>(
    exhaustMap((req) => {
      return defer(() => {
        if (req.article.favorited) {
          return this.#favoriteService.unFavorite(req.article.slug);
        } else {
          return this.#favoriteService.addFavorite(req.article.slug);
        }
      }).pipe(
        tapResponse({
          next: () => {
            this.getMyArticleByAuthor(req.query);
          },
          error: (e) => {
            console.log(e);
          },
        }),
      );
    }),
  );
}
