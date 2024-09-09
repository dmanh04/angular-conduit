import { Component } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { FeedToggleComponent } from '../feed-toggle/feed-toggle.component';
import { PopularTagComponent } from '../popular-tag/popular-tag.component';
import { ArticleReposne } from '../../../shared/models';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [ArticleComponent, FeedToggleComponent, PopularTagComponent],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss',
})
export class ListArticleComponent {
  listArticles: ArticleReposne[] = [
    {
      slug: 'ill-quantify-the-redundant-tcp-bus',
      title: `I'll quantify the redundant TCP bus,
                         that should hard drive the ADP bandwidth!`,
      description: `Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
                         Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      body: `This is the body of the article where detailed content goes.`,
      tagList: ['sit', 'reiciendis', 'consequuntur', 'nihil'],
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-08-01'),
      favorited: false,
      favoritesCount: 917,
      author: {
        username: 'Maksim Esteban',
        bio: 'Author bio goes here.',
        image: 'https://api.realworld.io/images/demo-avatar.png',
        following: false,
      },
    },
    {
      slug: 'ill-quantify-the-redundant-tcp-bus-2',
      title: `I'll quantify the redundant TCP bus,
                         that should hard drive the ADP bandwidth!`,
      description: `Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
                         Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      body: `This is the body of the article where detailed content goes.`,
      tagList: ['sit', 'reiciendis', 'consequuntur', 'nihil'],
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-08-01'),
      favorited: false,
      favoritesCount: 917,
      author: {
        username: 'Maksim Esteban',
        bio: 'Author bio goes here.',
        image: 'https://api.realworld.io/images/demo-avatar.png',
        following: false,
      },
    },
    {
      slug: 'ill-quantify-the-redundant-tcp-bus-3',
      title: `I'll quantify the redundant TCP bus,
                         that should hard drive the ADP bandwidth!`,
      description: `Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
                         Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      body: `This is the body of the article where detailed content goes.`,
      tagList: ['sit', 'reiciendis', 'consequuntur', 'nihil'],
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-08-01'),
      favorited: false,
      favoritesCount: 917,
      author: {
        username: 'Maksim Esteban',
        bio: 'Author bio goes here.',
        image: 'https://api.realworld.io/images/demo-avatar.png',
        following: false,
      },
    },
    {
      slug: 'ill-quantify-the-redundant-tcp-bus-4',
      title: `I'll quantify the redundant TCP bus,
                         that should hard drive the ADP bandwidth!`,
      description: `Aut facilis qui. Cupiditate sit ratione eum sunt rerum impedit.
                         Qui suscipit debitis et et voluptates voluptatem voluptatibus. Quas voluptatum quae corporis corporis possimus.`,
      body: `This is the body of the article where detailed content goes.`,
      tagList: ['sit', 'reiciendis', 'consequuntur', 'nihil'],
      createdAt: new Date('2023-08-01'),
      updatedAt: new Date('2023-08-01'),
      favorited: false,
      favoritesCount: 917,
      author: {
        username: 'Maksim Esteban',
        bio: 'Author bio goes here.',
        image: 'https://api.realworld.io/images/demo-avatar.png',
        following: false,
      },
    },
  ];
}
