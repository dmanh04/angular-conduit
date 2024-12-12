import { Routes } from '@angular/router';
import { ARTICLE_TYPE, provideArticleType } from './ui/profile-article-list/profile-article-list.di';

const profileRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ui/profile-article-list/profile-article-list.component').then(
        (c) => c.ProfileArticleListComponent,
      ),
    providers: [provideArticleType(ARTICLE_TYPE.MY_ARTICLE)],  
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./ui/profile-article-list/profile-article-list.component').then(
        (c) => c.ProfileArticleListComponent,
      ),
    providers: [provideArticleType(ARTICLE_TYPE.FAVORITED_ARTICLE)],    
  },
];

export default profileRoutes;
