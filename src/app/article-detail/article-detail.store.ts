import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { ArticleReposne, CommentResponse } from '../shared/models';
import { inject, Injectable } from '@angular/core';

import { defer, exhaustMap, Observable, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import {
  ArticleSerice,
  CommentCreateRequest,
  CommentService,
  FavoriteService,
  ProfileSerivce,
} from '../shared/services';
import { FormStatus } from '../shared/constants';

interface ArticleDetailState {
  isNotFound: boolean;
  articleResponse: ArticleReposne | null;
  isLoading: boolean;
  comments: CommentResponse[];
  status: FormStatus;
}

const initArticleDetailState: ArticleDetailState = {
  isNotFound: false,
  articleResponse: null,
  isLoading: false,
  comments: [],
  status: 'idle',
};

@Injectable()
export class ArticleDetailStore
  extends ComponentStore<ArticleDetailState>
  implements OnStoreInit
{
  ngrxOnStoreInit() {
    this.setState(initArticleDetailState);
  }

  readonly #articleService = inject(ArticleSerice);

  readonly #commentService = inject(CommentService);

  readonly #profileService = inject(ProfileSerivce);

  readonly #favoriteService = inject(FavoriteService);

  readonly articleResponse$ = this.select((state) => state.articleResponse);

  readonly isNotFound$ = this.select((state) => state.isNotFound);

  readonly commentReponse$ = this.select((state) => state.comments);

  readonly getArticleBySlug = this.effect<string>(
    switchMap((slug) => {
      this.patchState({
        isLoading: true,
      });
      return this.#articleService.findArticleBySlug(slug).pipe(
        tapResponse({
          next: (response) => {
            this.patchState({
              articleResponse: response.data,
              isNotFound: false,
            });
          },
          error: () => {
            this.patchState({
              isNotFound: true,
            });
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

  readonly getCommentByAricle = this.effect<string>(
    switchMap((slug) => {
      return this.#commentService.getListComment(slug).pipe(
        tapResponse({
          next: (response) => {
            this.patchState({
              comments: response.data,
            });
          },
          error: () => {
            this.patchState({
              comments: [],
            });
          },
        }),
      );
    }),
  );

  readonly createComment = this.effect<CommentCreateRequest>(
    exhaustMap((request) => {
      this.patchState({
        status: 'loading',
      });
      return this.#commentService.createComment(request).pipe(
        tapResponse({
          next: () => {
            this.getCommentByAricle(request.slug);
            this.patchState({
              status: 'success',
            });
          },
          error: (error) => {
            console.log(error);
          },
          finalize: () => {
            this.patchState({
              status: 'idle',
            });
          },
        }),
      );
    }),
  );

  readonly toggleFollowAuthor = this.effect(
    (follow$: Observable<ArticleReposne | null>) => {
      return follow$.pipe(
        exhaustMap((req) => {
          return defer(() => {
            if (req!.author.following) {
              return this.#profileService.unfollowProfile(req!.author.username);
            } else {
              return this.#profileService.followProfile(req!.author.username);
            }
          }).pipe(
            tapResponse({
              next: () => {
                this.getArticleBySlug(req!.slug);
              },
              error: (error) => {
                console.log(error);
              },
            }),
          );
        }),
      );
    },
  );

  readonly togglefavoriteArticle = this.effect(
    (favorited$: Observable<ArticleReposne | null>) => {
      return favorited$.pipe(
        exhaustMap((req) => {
          return defer(() => {
            if (req?.favorited) {
              return this.#favoriteService.unFavorite(req!.slug);
            } else {
              return this.#favoriteService.addFavorite(req!.slug);
            }
          }).pipe(
            tapResponse({
              next: () => {
                this.getArticleBySlug(req!.slug);
              },
              error: (error) => {
                console.log(error);
              },
            }),
          );
        }),
      );
    },
  );
}
