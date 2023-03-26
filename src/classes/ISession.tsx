export default interface ISession {
  start(): Promise<null>
  close(): void
  getMe(): IUser | undefined
}