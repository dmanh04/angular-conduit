export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  retypePassword: string;
}

export interface UpdateUserRequest {
  email: string;
  username: string;
  bio: string;
  image: string;
}

export interface UserResponse {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface AuthorResponse {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
