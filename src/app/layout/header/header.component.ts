import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '../../shared/store';
import { AsyncPipe, NgClass } from '@angular/common';
import { map } from 'rxjs';
import { MENU } from '../../shared/constants';
import { AuthMenuDirective } from '../../shared/directives';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    RouterLinkActive,
    NgClass,
    AuthMenuDirective,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly authStore = inject(AuthStore);
  readonly menu = MENU;
  readonly router = inject(Router);

  readonly username$ = this.authStore.selectCurrentUser$.pipe(
    map((state) => state?.username),
  );

  logout() {
    this.authStore.logout();
  }
}
