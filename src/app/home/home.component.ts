import { Component } from '@angular/core';

import {BannerComponent} from './ui/banner/banner.component'

import {ListArticleComponent} from './ui/list-article/list-article.component'

import {PaginationComponent} from './ui/pagination/pagination.component'

import {HeaderComponent} from '../layout/header/header.component'
import {FooterComponent} from '../layout/footer/footer.component'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,BannerComponent, ListArticleComponent, PaginationComponent
    ,FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
