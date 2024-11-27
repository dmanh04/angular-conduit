import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { ArticleDetailStore } from './article-detail.store';
import { AsyncPipe, DatePipe } from '@angular/common';
import { CommentFormComponent } from './ui/comment-form/comment-form.component';
import { CommentListComponent } from './ui/comment-list/comment-list.component';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [AsyncPipe, DatePipe, CommentFormComponent, CommentListComponent],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ArticleDetailStore)],
})
export class ArticleDetailComponent implements OnInit {
  @Input() slug: string = '';

  readonly articleDetailStore = inject(ArticleDetailStore);

  ngOnInit(): void {
    this.articleDetailStore.getArticleBySlug(this.slug);
    this.articleDetailStore.getCommentByAricle(this.slug);
  }

  followAuthor() {
    this.articleDetailStore.followAuthor(
      this.articleDetailStore.articleResponse$,
    );
  }

  unfollowAuthor() {
    this.articleDetailStore.unfollowAuthor(
      this.articleDetailStore.articleResponse$,
    );
  }

  favoritedArticle() {
    this.articleDetailStore.favoriteArticle(
      this.articleDetailStore.articleResponse$,
    );
  }

  unfavoritedArticle() {
    this.articleDetailStore.favoriteArticle(
      this.articleDetailStore.articleResponse$,
    );
  }
}
