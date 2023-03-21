import TokenManager from "./TokenManager"

export default class Me extends TokenManager{
  async refreshTokens(): Promise<boolean> {
    return super.refreshTokens()
  }
}