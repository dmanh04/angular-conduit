import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { FormStatus } from '../../../shared/constants';
import { TagResponse } from '../../../shared/models';
import { map, switchMap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { TagService } from '../../../shared/services';
import { HttpErrorResponse } from '@angular/common/http';

interface PopularTagState {
  status: FormStatus;
  tags: TagResponse[];
  error: string[];
}

const initPopularTagState: PopularTagState = {
  status: 'idle',
  tags: [],
  error: [],
};

@Injectable()
export class PopularTagStore
  extends ComponentStore<PopularTagState>
  implements OnStoreInit
{
  readonly #tagService = inject(TagService);

  readonly getTags$ = this.select((state) => state.tags);

  readonly isTagEmpty$ = this.select((state) => state.tags).pipe(
    map((res) => res.length === 0),
  );


  ngrxOnStoreInit() {
    this.setState(initPopularTagState);
  }

  readonly getAllTags = this.effect<void>(
    switchMap(() => {
      this.patchState({
        status: 'loading',
      });
      return this.#tagService.getTags().pipe(
        tapResponse({
          next: (res) => {
            this.patchState({
              tags: res.data,
            });
          },
          error: (err: HttpErrorResponse) => {
            this.patchState({
              error: err.error.messages,
            });
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
}
