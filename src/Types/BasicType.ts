
type personType = {
  id: number
  firstName: string,
  lastName: string,
  phone?: string,
  email?: string,
}
type accountType = {
  username: string,
  password: string,
  person: personType,
}

type loginType = {
  isLogin: boolean,
  token: string;
  account?: accountType,
}

type MenuItemType = {
  id: number,
  icon?:React.ReactNode,
  title: string,
  subMenu: { id: number,icon?:React.ReactNode, title: string, href: string, }[],
}

export type { personType, accountType, loginType, MenuItemType }