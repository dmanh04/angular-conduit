import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, UserResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #http = inject(HttpClient);

  login(userLogin: LoginRequest): Observable<UserResponse> {
    return this.#http.post<UserResponse>('auth/login', userLogin);
  }
}
