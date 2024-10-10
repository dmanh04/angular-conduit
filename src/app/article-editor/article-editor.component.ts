import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.articleEditorStore.isSuccess$.subscribe((value) => {
      if (value === true) {
        this.articleForm.reset();
        this.showAlert = true;
      }

      setTimeout(() => {
        this.showAlert = false;
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
}
