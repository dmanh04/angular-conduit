import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ARTICLE_TYPE, injectArticleType } from './profile-article-list.di';
import { provideComponentStore } from '@ngrx/component-store';
import { ProfileArticleListStore } from './profile-article-list.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '../../../shared/constants';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { PaginationComponent } from '../../../shared/ui/pagination/pagination.component';
import { ArticleReposne } from '../../../shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-article-list',
  standalone: true,
  imports: [AsyncPipe, DatePipe, PaginationComponent, RouterLink, NgClass],
  templateUrl: './profile-article-list.component.html',
  styleUrl: './profile-article-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideComponentStore(ProfileArticleListStore)],
})
export class ProfileArticleListComponent implements OnInit, OnDestroy {

  username: string = '';

  currenPage: number = DEFAULT_PAGE_INDEX;

  private subcription!: Subscription;

  readonly #route = inject(ActivatedRoute);

  readonly #articleType = injectArticleType();

  readonly profileArticleListStore = inject(ProfileArticleListStore);

  ngOnInit(): void {
    // /profile/dmanh || /profile/dmanh/favorites => dmanh
    if (this.#articleType == ARTICLE_TYPE.MyArticle) {
      this.username = this.#route.snapshot.params['username'];
    } else {
      this.username = this.#route.snapshot.parent?.params['username'];
    }
    this.filter(DEFAULT_PAGE_INDEX);

    this.subcription = this.profileArticleListStore.page$.subscribe((page) => {
      this.currenPage = page;
    });
  }

  changePage(page: number) {
    this.filter(page);
  }

  toogleFavorite(article: ArticleReposne) {
    this.profileArticleListStore.toogleFavorite({
      article: article,
      query: {
        query: {
          author: this.username,
          page: this.currenPage,
          size: DEFAULT_PAGE_SIZE,
        },
        type: this.#articleType,
      },
    });
  }

  filter(page: number) {
    this.profileArticleListStore.getMyArticleByAuthor({
      query: {
        author: this.username,
        page: page,
        size: DEFAULT_PAGE_SIZE,
      },
      type: this.#articleType,
    });
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
