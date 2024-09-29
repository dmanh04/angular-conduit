import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { tapResponse } from '@ngrx/operators';
import { FormStatus } from '../shared/constants';
import { inject, Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import {
  BaseResponse,
  CurrentUser,
  ErrorResponse,
  RegisterRequest,
} from '../shared/models';
import { UserService } from '../shared/services';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface RegisterFormState {
  status: FormStatus;
  error: string[];
}

@Injectable()
export class RegisterStore
  extends ComponentStore<RegisterFormState>
  implements OnStoreInit
{
  readonly #userService = inject(UserService);
  readonly #router = inject(Router);

  ngrxOnStoreInit() {
    this.setState({
      status: 'idle',
      error: [],
    });
  }

  readonly getErrorState$ = this.select((state) => {
    return state.error;
  });

  readonly getStatusState$ = this.select((state) => {
    return state.status;
  }).pipe(map((status) => status === 'loading'));

  readonly register = this.effect<RegisterRequest>(
    switchMap((registerRequest) => {
      this.patchState({
        status: 'loading',
      });
      return this.#userService.register(registerRequest).pipe(
        tapResponse({
          next: (res: BaseResponse<CurrentUser>) => {
            this.#router.navigate(['/login']);
          },
          error: (errorRes: HttpErrorResponse) => {
            this.patchState({
              error:  errorRes.error.messages,
            });
          },
          finalize: () => {
            this.patchState({
              status: 'idle',
            });
          },
        })
      );
    })
  );
}
