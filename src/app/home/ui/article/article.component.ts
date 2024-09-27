import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ArticleReposne } from '../../../shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  @Input({ required: true }) listArticle!: Observable<ArticleReposne[]>;
}
