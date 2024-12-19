import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthStore } from '../shared/store';
import { Subject, takeUntil } from 'rxjs';
import { provideComponentStore } from '@ngrx/component-store';
import { SettingStore } from './setting.store';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(SettingStore)],
})
export class SettingComponent implements OnInit, OnDestroy {
  readonly #authStore = inject(AuthStore);
  readonly settingStore = inject(SettingStore);
  readonly #onDestroy = new Subject<void>();

  updateUserForm = new FormGroup({
    username: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
      },
    ),
    email: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      },
    ),
    bio: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    image: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.#authStore.selectCurrentUser$
      .pipe(takeUntil(this.#onDestroy))
      .subscribe((currentUser) => {
        if (currentUser) {
          this.updateUserForm.patchValue(currentUser);
        }
      });
  }

  submit() {
    if (this.updateUserForm.invalid) {
      return;
    }
    this.settingStore.updateUser(this.updateUserForm.getRawValue());
  }

  logout() {
    this.#authStore.logout();
  }

  ngOnDestroy(): void {
    this.#onDestroy.next();
    this.#onDestroy.complete();
  }
}
