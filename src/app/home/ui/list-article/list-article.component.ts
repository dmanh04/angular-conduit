import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { FeedToggleComponent } from '../feed-toggle/feed-toggle.component';
import { PopularTagComponent } from '../popular-tag/popular-tag.component';
import { provideComponentStore } from '@ngrx/component-store';
import { ListArticleStore } from './list-article.store';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from '../../../shared/constants';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [
    ArticleComponent,
    FeedToggleComponent,
    PopularTagComponent,
    CommonModule,
    PaginationComponent
  ],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss',
  providers: [provideComponentStore(ListArticleStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListArticleComponent implements OnInit {
  readonly listArticleStore = inject(ListArticleStore);

  ngOnInit(): void {
    this.listArticleStore.findAllArticleByFilter({
      page: DEFAULT_PAGE_INDEX,
      size: DEFAULT_PAGE_SIZE
    });
  }

  changePage(pageChange: number){
    this.listArticleStore.findAllArticleByFilter({
      page: pageChange,
      size: DEFAULT_PAGE_SIZE
    });
  }
}

