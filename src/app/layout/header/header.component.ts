import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../shared/store';
import { provideComponentStore } from '@ngrx/component-store';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [provideComponentStore(AuthStore)],
})
export class HeaderComponent {
  readonly authStore = inject(AuthStore);

  readonly username$ = this.authStore.selectCurrentUser$.pipe(
    map((it) => it?.username)
  );
}
