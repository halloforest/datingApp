export interface SignUpDto {
    email: string,
    userName: string,
    introduce: string,
    imageUrl: string,
    password:string
}
  
export interface SignInDto {
    userName: string,
    password: string
}

export interface UserDto {
    id: string,
    email: string,
    userName: string,
    introduce: string,
    imageUrl: string,
    token: string
}