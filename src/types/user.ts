export type UserT = {
    email: string ,
    password: string,
    name?:string
}

export interface LogedUser{
    email: string,
    _id: string,
    isAdmin:boolean,
    name:string
}
