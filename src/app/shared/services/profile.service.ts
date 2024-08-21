import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ProfileResponse } from "../models/profile.model";
import { api_prefix } from "../constants/api.constant";

@Injectable({
    providedIn: "root"
})
export class ProfileService {

    constructor(private httpClient: HttpClient) {}

    getProfile(username: string): Observable<ProfileResponse> {
        return this.httpClient.get<ProfileResponse>(`${api_prefix}/profile/${username}`)
    }

    followUser(username: string): Observable<ProfileResponse> {
        return this.httpClient.post<ProfileResponse>(`${api_prefix}/profile/${username}/follow`, {})
    }

    unfollowUser(username: string): Observable<ProfileResponse> {
        return this.httpClient.delete<ProfileResponse>(`${api_prefix}/profile/${username}/follow`, {})
    }
}