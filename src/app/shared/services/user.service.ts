import { Injectable } from "@angular/core";
import { LoginUserRequest, NewUserRequest, UpdateUserRequest, UserResponse } from "../models/user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class UserService{

    constructor(private httpCLient:HttpClient){
    }

   login(user: LoginUserRequest): Observable<UserResponse>{
        return this.httpCLient.post<UserResponse>("/users/login", user)
   }

   register(user: NewUserRequest): Observable<UserResponse>{
    return this.httpCLient.post<UserResponse>("/users", {
        user
    })
   }

   get(): Observable<UserResponse>{
    return this.httpCLient.get<UserResponse>("/users")
   }

   update(user: UpdateUserRequest): Observable<UserResponse>{
    return this.httpCLient.put<UserResponse>("/users/login", {
        
    })
   }
}