import { createInjectionToken, ObjectValues } from '../../../shared/utils';

export enum ARTICLE_TYPE {
  MY_ARTICLE = 'myArticle',
  FAVORITED_ARTICLE = 'favoritedArticle',
};

export type ArticleType = ObjectValues<typeof ARTICLE_TYPE>;

export const [injectArticleType, provideArticleType] =
  createInjectionToken<ArticleType>('Article Type');
