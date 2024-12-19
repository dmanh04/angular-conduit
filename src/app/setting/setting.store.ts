import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { FormStatus } from '../shared/constants';
import { inject, Injectable } from '@angular/core';
import { AuthStore } from '../shared/store';
import { UserService } from '../shared/services';
import { ErrorResponse, UpdateUserRequest } from '../shared/models';
import { map, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface SettingState {
  status: FormStatus;
  error: string[];
}

const initSettingState: SettingState = {
  status: 'idle',
  error: [],
};

@Injectable()
export class SettingStore
  extends ComponentStore<SettingState>
  implements OnStoreInit
{
  readonly #authStore = inject(AuthStore);

  readonly #userService = inject(UserService);

  readonly isLoading$ = this.select((state) => state.status).pipe(
    map((it) => it === 'loading'),
  );

  readonly error$ = this.select((state) => state.error);

  ngrxOnStoreInit() {
    this.setState(initSettingState);
  }

  readonly updateUser = this.effect<UpdateUserRequest>(
    switchMap((req) => {
      this.patchState({
        status: 'loading',
      });
      return this.#userService.updateUser(req).pipe(
        tapResponse({
          next: (response) => {
            this.patchState({
              status: 'success',
            });
            this.#authStore.handleAfterUpdateUser(response.data);
          },
          error: (error: HttpErrorResponse) => {
            this.patchState({
              status: 'idle',
              error: (error.error as ErrorResponse).messages,
            });
          },
        }),
      );
    }),
  );
}
