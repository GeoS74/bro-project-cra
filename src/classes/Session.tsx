import serviceHost from "../libs/service.host";
import TokenManager from "./TokenManager";
import IMe from "./ISession"
import IObserverPattern from "./IObserverPattern"

export default class Session extends TokenManager implements IMe, IObserverPattern {
  _me: IUser | undefined
  _stateHooks: Map<string, React.Dispatch<React.SetStateAction<IUser | undefined>>> = new Map()

  constructor() {
    super();
  }

  setAccess(accessToken: string): void {
    super.setAccess(accessToken)

    if (!this.getMe() && this.getAccess()) {
      this.whoAmI()
        .then((me) => this.setMe(me))
        .then(() => this.notify())
    }
  }

  async start() {
    if (this.getRefresh() && !this.getAccess()) {

      this.refreshTokens()
        .then(() => this.whoAmI())
        .then((me) => this.setMe(me))
        .then(() => this.notify())
    }
  }

  close() {
    this.setAccess("");
    this.setRefresh("");
    this.setMe(undefined);
    this.notify();
  }

  subscribe(componentKey: string, hook: React.Dispatch<React.SetStateAction<IUser | undefined>>) {
    this._stateHooks.set(componentKey, hook)
  }

  unsubscribe(componentKey: string) {
    this._stateHooks.delete(componentKey)
  }

  notify() {
    this._stateHooks.forEach(hook => hook(this.getMe()))
  }

  private async whoAmI() {
    return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
      headers: {
        'Authorization': `Bearer ${this.getAccess()}`
      }
    })
      .then(async res => {
        if (res.ok) {
          const me = await res.json();
          return me;
        }
      })
  }

  private async setMe(me?: IUser) {
    this._me = me;
  }

  getMe() {
    return this._me;
  }
}