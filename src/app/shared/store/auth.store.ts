import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { BehaviorSubject } from "rxjs";
import { LoginUserRequest, UserResponse } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthStore{

    #router = inject(Router);
    #userService = inject(UserService);
    #authStore$ = new BehaviorSubject<UserResponse | null>(null);

    get authStore$(){
        return this.#authStore$.asObservable();
    }

    login(loginUserrequest: LoginUserRequest ){
        debugger
        this.#userService.login(loginUserrequest).subscribe({
            next: (value) => {
                this.#authStore$.next(value);
                localStorage.setItem('user', JSON.stringify(value.user))
                this.#router.navigate(['/']);
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    logout(){
        localStorage.removeItem('user')
        this.#router.navigate(['/login']);
    }
}