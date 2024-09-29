import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { provideComponentStore } from '@ngrx/component-store';
import { RegisterStore } from './register.store';
import { FormErrorComponent } from '../shared/ui/form-error/form-error.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormErrorComponent, AsyncPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  providers: [provideComponentStore(RegisterStore)],
})
export class RegisterComponent {
  readonly registerStore = inject(RegisterStore);

  readonly registerForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    retypePassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.registerStore.register(this.registerForm.getRawValue());
  }
}
