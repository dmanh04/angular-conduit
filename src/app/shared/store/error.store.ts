import { Injectable } from '@angular/core';
import { ComponentStore, OnStoreInit } from '@ngrx/component-store';
import { map, switchMap } from 'rxjs';

export interface ErrorState {
  errors: string[];
}

@Injectable()
export class ErrorStore
  extends ComponentStore<ErrorState>
  implements OnStoreInit
{
  ngrxOnStoreInit(): void {
    this.setState({
      errors: [],
    });
  }

  readonly getErrorStore = this.select((state) => {
    return state.errors;
  });

  readonly sendError = (params: string[]) => {
    this.patchState({
      errors: params,
    });
  };
}
