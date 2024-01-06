
type personType = {
  id:number
  firstName:string,
  lastName:string,
  phone?:string,
  email?:string,
}
type accountType = {
  username:string,
  password:string,
  person:personType,
}

type loginType = {
  isLogin:boolean,
  token:string;
  account?:accountType,
}

export type {personType, accountType, loginType}