import { AuthorResponse } from './user.model';

export interface ArticleReposne {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorResponse;
}

export interface ArticleRequest {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
