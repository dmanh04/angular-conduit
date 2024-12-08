import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { ArticleReposne, ProfileResponse } from '../shared/models';
import { inject, Injectable } from '@angular/core';
import { defer, exhaustMap, switchMap } from 'rxjs';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../shared/constants';
import { ProfileSerivce } from '../shared/services';

interface ProfileState {
  isNotFound: boolean;
  profile: ProfileResponse | null;
  articles: ArticleReposne[];
  totalPages: number;
  totalElements: number;
  page: number;
  size: number;
}

const initProfileState: ProfileState = {
  isNotFound: false,
  profile: null,
  articles: [],
  totalPages: 0,
  totalElements: 0,
  page: DEFAULT_PAGE_INDEX,
  size: DEFAULT_PAGE_SIZE,
};

@Injectable()
export class ProfileStore
  extends ComponentStore<ProfileState>
  implements OnStoreInit
{
  readonly #profileService = inject(ProfileSerivce);

  readonly isNotFound$ = this.select((state) => state.isNotFound);

  readonly profile$ = this.select((state) => state.profile);

  ngrxOnStoreInit() {
    this.setState(initProfileState);
  }

  readonly getProfileByUsername = this.effect<string>(
    switchMap((author) => {
      return this.#profileService.getProfile(author).pipe(
        tapResponse({
          next: (res) => {
            this.patchState({
              isNotFound: false,
              profile: res.data,
            });
          },
          error: () => {
            this.patchState({
              isNotFound: true,
            });
          },
        }),
      );
    }),
  );

  readonly toogleFollow = this.effect<ProfileResponse | null>(
    exhaustMap((req) => {
      return defer(() => {
        if (req!.following) {
          return this.#profileService.unfollowProfile(req!.username);
        } else {
          return this.#profileService.followProfile(req!.username);
        }
      }).pipe(
        tapResponse({
          next: (response) => {
            this.getProfileByUsername(response.data.username);
          },
          error: (e) => {
            console.log(e);
          },
        }),
      );
    }),
  );
}
