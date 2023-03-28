interface IUser {
  email: string
  rank: string
  roles: IRole[]
  name?: string
  photo?: string
  status?: string
}