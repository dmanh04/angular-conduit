import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, BaseResponse, CurrentUser, LoginRequest, UserResponse } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #http = inject(HttpClient);

  login(userLogin: LoginRequest): Observable<BaseResponse<AuthResponse>> {
    return this.#http.post<BaseResponse<AuthResponse>>('auth/login', userLogin);
  }

  getCurrentUser(): Observable<BaseResponse<CurrentUser>>{
    return this.#http.get<BaseResponse<CurrentUser>>('users');
  }
}
