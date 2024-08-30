import { Injectable } from '@angular/core';
import {
  LoginUserRequest,
  NewUserRequest,
  UpdateUserRequest,
  UserResponse,
} from '../models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpCLient: HttpClient) { }

  login(user: LoginUserRequest): Observable<UserResponse> {
    // return this.httpCLient.post<UserResponse>(`users/login`, user);
    return of<UserResponse>({
      user: {
        email: 'manhkspt2004@gmail.com',
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE3MjQ5NDI1NzQsImlhdCI6MTcyNDk0MTY3NCwic2NvcGUiOiJBRE1JTiBVU0VSIn0.gLJqMc2yMUguFCEO0MQ4emk37wH85QYuYGsSeyiub0PIyz9ICFvDk7EaLF_y7roclqhkUkyGN8UkJa2TGo1dxA',
        username: 'manhks123',
        bio: 'manh',
        image: 'manh.jpg'
      },
    });
  }

  register(user: NewUserRequest): Observable<UserResponse> {
    return this.httpCLient.post<UserResponse>(`users`, {
      user,
    });
  }

  get(): Observable<UserResponse> {
    return this.httpCLient.get<UserResponse>(`users`);
  }

  update(user: UpdateUserRequest): Observable<UserResponse> {
    return this.httpCLient.put<UserResponse>(`users/login`, {});
  }
}
