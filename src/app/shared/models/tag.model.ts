export interface ListTagResponse {
  tags: TagResponse[];
}

export interface TagResponse {
  id: number;
  name: string;
}

export interface TagRequest {
  id: number;
  name: string;
}
