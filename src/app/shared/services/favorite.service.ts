import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SingleArticleResponse } from '../models/article.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(private httpClient: HttpClient) {}

  getTags(slug: string): Observable<SingleArticleResponse> {
    return this.httpClient.get<SingleArticleResponse>(
      `articles/${slug}/favorite`
    );
  }

  deleteTags(slug: string): Observable<SingleArticleResponse> {
    return this.httpClient.delete<SingleArticleResponse>(
      `articles/${slug}/favorite`
    );
  }
}
