import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { ArticleReposne } from '../../../shared/models';
import { Observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @Input({ required: true }) listArticle!: Observable<ArticleReposne[]>;
  readonly #router = inject(Router);

  navigateToArticleDetail(slug: string) {
    this.#router.navigate([`/article/${slug}`]);
  }
}
