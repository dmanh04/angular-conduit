import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthStore } from "../store/auth.store";
import { map } from "rxjs";



export const nonAuthStore: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    const authStore = inject(AuthStore);
    return authStore.authStore$.pipe(
        map((value) => {
            return !value;
        })
    )
}