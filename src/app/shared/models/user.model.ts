export interface LoginUser {
    email: string,
    password: string
}

export interface LoginUserRequest {
    user: LoginUser
}

export interface NewUser {
    username: string,
    email: string,
    password: string
}

export interface NewUserRequest {
    user: NewUser
}

export interface User {
    email: string,
    token: string,
    username: string,
    bio: string,
    image: string
}

export interface UserResponse {
    user: User
}

export interface UpdateUser {
    email: string,
    token: string,
    username: string,
    bio: string,
    image: string
}

export interface UpdateUserRequest {
    user: UpdateUser
}

