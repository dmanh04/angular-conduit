import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginStore } from './login.store';
import { provideComponentStore } from '@ngrx/component-store';import { CommonModule } from '@angular/common';
import { AuthStore, ErrorStore } from '../shared/store';
import { FormErrorComponent } from '../shared/ui/form-error/form-error.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [
    provideComponentStore(LoginStore),
    provideComponentStore(AuthStore),
    provideComponentStore(ErrorStore),
  ],
})
export class LoginComponent {
  readonly loginStore = inject(LoginStore);

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
  });

  login() {
    if (this.loginForm.invalid) {
    } else {
      this.loginStore.login({
        email: this.loginForm.controls.email.getRawValue()!,
        password: this.loginForm.controls.password.getRawValue()!,
      });
    }
  }
}
