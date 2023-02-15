import serviceHost from "../libs/service.host"
import ITokenManager from "./ITokenManager"

class TokenManager implements ITokenManager {

  _refresh = ""
  _access = ""

  constructor() {
    this.setRefresh(localStorage.getItem(`session_id`) || "")
    
    // don`t call async function this.refreshTokens() in constructor!!!
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
  async refreshTokens(): Promise<boolean> {
    if (!this._refresh) {
      return false
    }

    return fetch(`${serviceHost("mauth")}/api/mauth/refresh`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${this._refresh}`
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