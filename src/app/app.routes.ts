import { Routes } from '@angular/router';
import { authGuard, nonAuthGuard } from './shared/guards/index ';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    title: 'Home',
  },
  {
    path: 'article',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./home/home.component').then((c) => c.HomeComponent),
        title: 'Article',
      },
      {
        path: ':slug',
        loadComponent: () =>
          import('./article-detail/article-detail.component').then(
            (c) => c.ArticleDetailComponent,
          ),

        title: 'Article Detail',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((c) => c.LoginComponent),
    title: 'Sign in - Conduit',
    canMatch: [nonAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((c) => c.RegisterComponent),
    title: 'Sign up - Conduit',
    canMatch: [nonAuthGuard],
  },
  {
    path: 'setting',
    loadComponent: () =>
      import('./setting/setting.component').then((c) => c.SettingComponent),
    title: 'Setting',
    canMatch: [authGuard],
  },
  {
    path: 'editor',
    loadComponent: () =>
      import('./article-editor/article-editor.component').then(
        (c) => c.ArticleEditorComponent,
      ),
    title: 'Editor - Conduit',
    canMatch: [authGuard],
  },
  {
    path: 'profile',
    children: [
      {
        path: ':username',
        loadComponent: () =>
          import('./profile/profile.component').then((c) => c.ProfileComponent),
        loadChildren: () => import('./profile/profile.routes'),
        title: 'Profile',
      },
    ],
  },
];
