import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { FormStatus } from '../shared/constants';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../shared/services';
import { exhaustMap, map } from 'rxjs';
import {
  AuthResponse,
  BaseResponse,
  ErrorResponse,
  UserResponse,
} from '../shared/models';
import { AuthStore } from '../shared/store';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface LoginFormState {
  status: FormStatus;
  error: string[];
}

@Injectable()
export class LoginStore
  extends ComponentStore<LoginFormState>
  implements OnStoreInit
{
  readonly #userService = inject(UserService);
  readonly #authStore = inject(AuthStore);
  readonly #router = inject(Router);

  ngrxOnStoreInit() {
    this.setState({
      status: 'idle',
      error: [],
    });
  }

  readonly statusLoginStore$ = this.select((state) => {
    return state.status;
  }).pipe(map((status) => status === 'loading'));

  readonly getError$ = this.select((state) => {
    return state.error;
  });

  readonly login = this.effect<{
    email: string;
    password: string;
  }>(
    exhaustMap((params) => {
      this.patchState({
        status: 'loading',
      });

      return this.#userService.login(params).pipe(
        tapResponse({
          next: (res: BaseResponse<AuthResponse>) => {
            this.#authStore.handleAfterRecieveToken(res.data);
            this.#authStore.getCurrentUser();
            this.#router.navigate(['/']);
          },
          error: (errorRes: HttpErrorResponse) => {
            console.log(errorRes);
            const error: ErrorResponse = errorRes.error;
            this.patchState({
              error: error.messages,
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
