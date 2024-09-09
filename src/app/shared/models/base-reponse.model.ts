export interface BaseResponse<T> {
  timestamp: Date;
  code: number;
  data: T;
}
