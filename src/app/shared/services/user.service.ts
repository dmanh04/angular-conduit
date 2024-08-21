import { Injectable } from "@angular/core";
import { LoginUserRequest, NewUserRequest, UpdateUserRequest, UserResponse } from "../models/user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { api_prefix } from "../constants/api.constant";

@Injectable({
    providedIn: "root"
})
export class UserService{

    constructor(private httpCLient:HttpClient){}

    login(user: LoginUserRequest): Observable<UserResponse>{
        return this.httpCLient.post<UserResponse>(`${api_prefix}/users/login`, user)
   }

    register(user: NewUserRequest): Observable<UserResponse>{
    return this.httpCLient.post<UserResponse>(`${api_prefix}/users`, {
        user
    })
   }

    get(): Observable<UserResponse>{
    return this.httpCLient.get<UserResponse>(`${api_prefix}/users`)
   }

    update(user: UpdateUserRequest): Observable<UserResponse>{
    return this.httpCLient.put<UserResponse>(`${api_prefix}/users/login`, {
    })
   }
}