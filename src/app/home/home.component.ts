import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BannerComponent } from './ui/banner/banner.component';

import { ListArticleComponent } from './ui/list-article/list-article.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, ListArticleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
