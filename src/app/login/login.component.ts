import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginStore } from './login.store';
import { provideComponentStore } from '@ngrx/component-store';
import { AsyncPipe } from '@angular/common';
import { FormErrorComponent } from '../shared/ui/form-error/form-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AsyncPipe, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    provideComponentStore(LoginStore),
  ],
})
export class LoginComponent {
  readonly loginStore = inject(LoginStore);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginStore.login(this.loginForm.getRawValue());
  }
}
