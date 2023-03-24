export default interface IMe {
    getMe(): IUser | undefined,
    refreshTokens(): Promise<boolean>
  }