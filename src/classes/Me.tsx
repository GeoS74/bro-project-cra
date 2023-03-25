import serviceHost from "../libs/service.host";
import TokenManager from "./TokenManager";
import IMe from "./IMe"

export default class Me extends TokenManager implements IMe {
    _me: IUser | undefined
    _stateHooks: Map<string, React.Dispatch<React.SetStateAction<undefined>>> = new Map()

    constructor() {
        super();
    }

    subscribe(component: string, hook: React.Dispatch<React.SetStateAction<undefined>>){
      this._stateHooks.set(component, hook)
    }

    unsubscribe(component: string, hook: React.Dispatch<React.SetStateAction<undefined>>){
      this._stateHooks.set(component, hook)
    }

    private notify(){
      this._stateHooks.forEach(hook => hook(undefined))
    }

    async refreshTokens(): Promise<boolean> {
        const isRefreshed = await super.refreshTokens();

        if (isRefreshed) {
            const me = await this.whoAmI();
            this.setMe(me);
            this.notify();
        }
        return isRefreshed;
    }

    private async whoAmI(){
        return fetch(`${serviceHost("mauth")}/api/mauth/access/`, {
            headers: {
                'Authorization': `Bearer ${this.getAccess()}`
            }
        })
        .then(async res => {
            if(res.ok){
                const me = await res.json();
                return me;
            }
        })
    }

    private async setMe(me: IUser) {
        this._me = me;
    }

    getMe() {
        return this._me;
    }
}