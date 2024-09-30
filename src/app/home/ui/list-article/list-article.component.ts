import { Component, inject, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { FeedToggleComponent } from '../feed-toggle/feed-toggle.component';
import { PopularTagComponent } from '../popular-tag/popular-tag.component';
import { ArticleReposne } from '../../../shared/models';
import { provideComponentStore } from '@ngrx/component-store';
import { ListArticleStore } from './list-article.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [
    ArticleComponent,
    FeedToggleComponent,
    PopularTagComponent,
    CommonModule,
  ],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss',
  providers: [provideComponentStore(ListArticleStore)],
})
export class ListArticleComponent implements OnInit {
  readonly listArticleStore = inject(ListArticleStore);

  ngOnInit(): void {
    this.listArticleStore.findAllArticleByFilter({
      page: 1,
      size: 10,
    });
  }
}
