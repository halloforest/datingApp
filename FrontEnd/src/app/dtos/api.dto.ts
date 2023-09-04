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

export interface UserTokenDto {
    userName: string,
    token: string
}