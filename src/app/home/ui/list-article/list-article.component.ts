import { Component } from '@angular/core';

import { ArticleComponent } from '../article/article.component';
import { FeedToggleComponent } from '../feed-toggle/feed-toggle.component';
import { PopularTagComponent } from '../popular-tag/popular-tag.component';
import { Article } from '../../../shared/models/article.model';

@Component({
  selector: 'app-list-article',
  standalone: true,
  imports: [ArticleComponent, FeedToggleComponent, PopularTagComponent],
  templateUrl: './list-article.component.html',
  styleUrl: './list-article.component.scss',
})
export class ListArticleComponent {
  listArticles: Article[] = [
    {
      slug: 'how-to-learn-angular',
      title: 'How to Learn Angular',
      description: 'A comprehensive guide on getting started with Angular.',
      tagList: ['Angular', 'JavaScript', 'Frontend'],
      createdAt: new Date('2024-08-01T10:20:30Z'),
      updatedAt: new Date('2024-08-02T11:30:40Z'),
      favorited: true,
      favoritesCount: 150,
      author: {
        username: 'john_doe',
        bio: 'Full-stack developer passionate about modern web technologies.',
        image: 'https://api.realworld.io/images/demo-avatar.png',
        following: true,
      },
    },
    {
      slug: 'advanced-typescript-techniques',
      title: 'Advanced TypeScript Techniques',
      description:
        'Take your TypeScript skills to the next level with these advanced techniques.',
      tagList: ['TypeScript', 'JavaScript', 'Programming'],
      createdAt: new Date('2024-08-05T14:15:00Z'),
      updatedAt: new Date('2024-08-06T15:25:10Z'),
      favorited: false,
      favoritesCount: 75,
      author: {
        username: 'jane_smith',
        bio: 'Software engineer and TypeScript enthusiast.',
        image: 'https://api.realworld.io/images/demo-avatar.png',
        following: false,
      },
    },
    {
      slug: 'restful-api-best-practices',
      title: 'RESTful API Best Practices',
      description:
        'Learn the best practices for designing and building RESTful APIs.',
      tagList: ['API', 'Backend', 'REST'],
      createdAt: new Date('2024-08-10T09:05:20Z'),
      updatedAt: new Date('2024-08-11T10:15:30Z'),
      favorited: true,
      favoritesCount: 200,
      author: {
        username: 'alice_wonder',
        bio: 'Backend developer focused on scalable and efficient APIs.',
        image: 'https://api.realworld.io/images/demo-avatar.png',
        following: true,
      },
    },
  ];
}
