import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { ArticleDetailStore } from './article-detail.store';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { CommentFormComponent } from './ui/comment-form/comment-form.component';
import { CommentListComponent } from './ui/comment-list/comment-list.component';
import { ArticleReposne } from '../shared/models';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CommentFormComponent, CommentListComponent, NgClass],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ArticleDetailStore)],
})
export class ArticleDetailComponent {
  @Input() set slug(value: string) {
    this.articleDetailStore.getArticleBySlug(value);
    this.articleDetailStore.getCommentByAricle(value);
  }

  readonly articleDetailStore = inject(ArticleDetailStore);

  toggleFollowAuthor(articleResponse: ArticleReposne) {
    this.articleDetailStore.toggleFollowAuthor(articleResponse);
  }

  toggleFavoritedArticle(articleResponse: ArticleReposne) {
    this.articleDetailStore.togglefavoriteArticle(articleResponse);
  }

}
