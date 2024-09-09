export interface ErrorResponse<T> {
  timestamp: Date;
  code: number;
  messages: T;
}
