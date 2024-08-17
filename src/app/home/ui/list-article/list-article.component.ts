import { Component } from '@angular/core';

import {ArticleComponent} from '../article/article.component'
import {FeedToggleComponent} from '../feed-toggle/feed-toggle.component'
import {PopularTagComponent} from '../popular-tag/popular-tag.component'
import { Article } from '../../../shared/models/article.model';


@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [ArticleComponent, FeedToggleComponent, PopularTagComponent],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss'
})
export class ListArticleComponent {
  listArticles:Article[] = [
    { avatar:'https://api.realworld.io/images/demo-avatar.png',
      author: 'Maksim Esteban' ,
      date: new Date('2023-08-01'),
      title: `Ill quantify the redundant TCP bus,
             that should hard drive the ADP bandwidth!`,
      description: ` Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
             Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      favorite: 917,
      footer_tags: ['sit', 'reiciendis', 'consequuntur', 'nihil']              
    },
    { avatar:'https://api.realworld.io/images/demo-avatar.png',
      author: 'Maksim Esteban' ,
      date: new Date('2023-08-01'),
      title: `Ill quantify the redundant TCP bus,
             that should hard drive the ADP bandwidth!`,
      description: ` Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
             Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      favorite: 917,
      footer_tags: ['sit', 'reiciendis', 'consequuntur', 'nihil']              
    },
    { avatar:'https://api.realworld.io/images/demo-avatar.png',
      author: 'Maksim Esteban' ,
      date: new Date('2023-08-01'),
      title: `Ill quantify the redundant TCP bus,
             that should hard drive the ADP bandwidth!`,
      description: ` Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
             Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      favorite: 917,
      footer_tags: ['sit', 'reiciendis', 'consequuntur', 'nihil']              
    },
    { avatar:'https://api.realworld.io/images/demo-avatar.png',
      author: 'Maksim Esteban' ,
      date: new Date('2023-08-01'),
      title: `Ill quantify the redundant TCP bus,
             that should hard drive the ADP bandwidth!`,
      description: ` Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
             Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      favorite: 917,
      footer_tags: ['sit', 'reiciendis', 'consequuntur', 'nihil']              
    }
  ];
}
