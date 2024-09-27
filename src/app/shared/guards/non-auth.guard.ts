import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from '../store';
import { map, take } from 'rxjs';

export const nonAuthGuard: CanMatchFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.selectIsAuthenticated$.pipe(
    map((state) => !state || router.createUrlTree(['/'])),
    take(1),
  );
};
