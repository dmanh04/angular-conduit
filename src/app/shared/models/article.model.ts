import { Profile } from "./profile.model";

export interface Article{
    slug: string,
    title: string,
    description: string,
    tagList: string[],
    createdAt: Date,
    updatedAt: Date,
    favorited: boolean,
    favoritesCount: number,
    author: Profile
}


export interface SingleArticleResponse{
  article: Article
}
export interface MultipleArticleResponse{
  articles: Article[],
  articlesCount: number
}

export interface NewArticle{
  title: string,
  description: string,
  body: string,
  tagList: string[]
}

export interface NewArticleRequest{
  article: NewArticle
}

export interface UpdateArticle{
  title: string,
  description: string,
  body: string
}

export interface UpdateArticleRequest{
  article: UpdateArticle
}