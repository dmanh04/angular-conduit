import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../shared/store';
import { AsyncPipe } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { map } from 'rxjs';
import { MENU_AUTH, MENU_NON_AUTH } from '../../shared/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, AsyncPipe, NzIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly authStore = inject(AuthStore);
  readonly menuNonAuth = MENU_NON_AUTH;
  readonly menuAuth = MENU_AUTH;

  readonly username$ = this.authStore.selectCurrentUser$.pipe(
    map((state) => state?.username),
  );

  logout() {
    this.authStore.logout();
  }


}
