import serviceHost from "../libs/service.host"
import ITokenManager from "./ITokenManager"

class TokenManager implements ITokenManager {

  _refresh: string = ""
  _access: string = ""

  constructor() {
    this.refreshTokens(localStorage.getItem(`session_id`) || "")
  }

  getRefresh(): string {
    return this._refresh || ""
  }
  getAccess(): string {
    return this._access || ""
  }
  setRefresh(refreshToken: string): void {
    localStorage.setItem(`session_id`, refreshToken)
    this._refresh = refreshToken
  }
  setAccess(accessToken: string): void {
    this._access = accessToken
  }
  async refreshTokens(refreshToken: string): Promise<boolean> {
    if (!refreshToken) {
      return false
    }

    return fetch(`${serviceHost("mauth")}/api/mauth/refresh`, {
      method: "GET",
      headers: {
        'Authorisation': `Bearer ${refreshToken}`
      }
    }).then(async (req) => {
      if (req.ok) {
        const res = await req.json();
        this.setAccess(res.access);
        this.setRefresh(res.refresh);
        return true;
      }
      throw new Error(`response status: ${req.status}`)
    })
      .catch(() => {
        this.setAccess("");
        this.setRefresh("");
        return false
      })
  }
}

export default new TokenManager();