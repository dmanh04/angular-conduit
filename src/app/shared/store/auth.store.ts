import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { AuthResponse, BaseResponse, CurrentUser } from '../models';
import { inject, Injectable } from '@angular/core';
import { LocalStorage, STORAGE_KEY } from '../constants';
import { switchMap } from 'rxjs';
import { UserService } from '../services';

interface AuthState {
  currentUser: CurrentUser | null;
  isAuthenticated: boolean;
}

@Injectable()
export class AuthStore
  extends ComponentStore<AuthState>
  implements OnStoreInit
{
  readonly #userService = inject(UserService);
  readonly #localStorageService = inject(LocalStorage);

  ngrxOnStoreInit(): void {
    this.setState({
      currentUser: this.#localStorageService.getItem<CurrentUser>(
        STORAGE_KEY.user
      ),
      isAuthenticated: false,
    });
  }

  readonly selectCurrentUser$ = this.select((state) => state.currentUser);

  readonly selectIsAuthenticated$ = this.select(
    (state) => state.isAuthenticated
  );

  readonly getCurrentUser = this.effect<void>(
    switchMap(() => {
      return this.#userService.getCurrentUser().pipe(
        tapResponse({
          next: (res: BaseResponse<CurrentUser>) => {
            console.log(res.data);
            this.#localStorageService.setItem(STORAGE_KEY.user, res.data);
            this.patchState({
              currentUser: res.data,
              isAuthenticated: true,
            });
          },
          error: (error) => {
            console.log(error);
          },
        })
      );
    })
  );

  readonly handleAfterRecieveToken = (auth: AuthResponse) => {
    this.#localStorageService.setItem(STORAGE_KEY.token, auth);
  };
}
