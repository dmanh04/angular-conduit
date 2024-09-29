import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { FormStatus } from '../shared/constants';
import { inject, Injectable } from '@angular/core';
import { ArticleRequest } from '../shared/models';
import { map, switchMap } from 'rxjs';
import { ArticleSerice } from '../shared/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface ArticleEditorState {
  status: FormStatus;
  error: string[];
}

@Injectable()
export class ArticleEditorStore
  extends ComponentStore<ArticleEditorState>
  implements OnStoreInit
{
  readonly #articleService = inject(ArticleSerice);
  readonly #router = inject(Router);

  ngrxOnStoreInit() {
    this.setState({
      status: 'idle',
      error: [],
    });
  }

  readonly errorMessages$ = this.select((state) => state.error);

  readonly isLoading$ = this.select((state) => state.status).pipe(
    map((st) => st === 'loading'),
  );

  readonly isSuccess$ = this.select((state) => state.status).pipe(
    map((st) => st === 'success'),
  );

  readonly addArticle = this.effect<ArticleRequest>(
    switchMap((body) => {
      this.patchState({
        status: 'loading',
      });
      return this.#articleService.addArticle(body).pipe(
        tapResponse({
          next: () => {
            this.patchState({
              status: 'success',
            });
            // this.#router.navigate(['/']);
          },
          error: (errorRes: HttpErrorResponse) => {
            this.patchState({
              error: errorRes.error.messages,
              status: 'idle',
            });
          },
          // finalize: () => {
          //   this.patchState({
          //     status: 'idle',
          //   });
          // },
        }),
      );
    }),
  );
}
