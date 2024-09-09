export interface PageReponse<T> {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  items: T[];
}
