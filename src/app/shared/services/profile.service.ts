import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse, ProfileResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProfileSerivce {
  readonly #http = inject(HttpClient);

  getProfile(username: string): Observable<BaseResponse<ProfileResponse>>{
    return this.#http.get<BaseResponse<ProfileResponse>>(`profiles/${username}`)
  }

  followProfile(username: string): Observable<BaseResponse<ProfileResponse>> {
    return this.#http.post<BaseResponse<ProfileResponse>>(
      `profiles/${username}/follow`,
      null,
    );
  }

  unfollowProfile(username: string): Observable<BaseResponse<ProfileResponse>> {
    return this.#http.delete<BaseResponse<ProfileResponse>>(
      `profiles/${username}/follow`,
    );
  }
}
