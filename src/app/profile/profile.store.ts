import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { ProfileResponse } from '../shared/models';
import { inject, Injectable } from '@angular/core';
import { defer, exhaustMap, switchMap } from 'rxjs';
import { ProfileSerivce } from '../shared/services';

interface ProfileState {
  isNotFound: boolean;
  profile: ProfileResponse | null;
}

const initProfileState: ProfileState = {
  isNotFound: false,
  profile: null,
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
