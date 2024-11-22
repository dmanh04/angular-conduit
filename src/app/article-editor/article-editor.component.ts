import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideComponentStore } from '@ngrx/component-store';
import { ArticleEditorStore } from './article-editor.store';
import { FormErrorComponent } from '../shared/ui/form-error/form-error.component';
import { AsyncPipe } from '@angular/common';
import { TagSelectorsComponent } from './ui/tag-selectors/tag-selectors.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormErrorComponent,
    AsyncPipe,
    TagSelectorsComponent,
  ],
  templateUrl: './article-editor.component.html',
  styleUrl: './article-editor.component.scss',
  providers: [provideComponentStore(ArticleEditorStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleEditorComponent implements OnInit {
  showAlert = false;
  readonly articleEditorStore = inject(ArticleEditorStore);
  readonly destroy$ = new Subject<void>();
  readonly #cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.articleEditorStore.isSuccess$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
      if (value === true) {
        this.articleForm.reset();
        this.showAlert = true;
        this.#cdr.markForCheck();
      }

      setTimeout(() => {
        this.showAlert = false;
        this.#cdr.markForCheck();
      }, 2000);
    });
  }

  readonly articleForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {}),
    body: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tagList: new FormControl<string[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  submit() {
    if (this.articleForm.invalid) {
      return;
    }
    this.articleEditorStore.addArticle(this.articleForm.getRawValue());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
