import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ArticleDetailStore } from '../../article-detail.store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentFormComponent {
  @Input({ required: true }) slug?: string;

  readonly articleDetailStore = inject(ArticleDetailStore);

  commentForm = new FormGroup({
    comment: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  submit() {
    if (this.commentForm.invalid) {
      Object.values(this.commentForm.controls).forEach((c) => {
        c.markAsDirty();
      });
      return;
    }
    this.articleDetailStore.createComment({
      slug: this.slug!,
      comment: {
        body: this.commentForm.controls.comment.value,
      },
    });
    this.commentForm.reset();
  }
}
