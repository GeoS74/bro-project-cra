import serviceHost from "../libs/service.host";
import TokenManager from "./TokenManager";
import IMe from "./IMe"

export default class Me extends TokenManager implements IMe {
    _me: IUser | undefined

    constructor() {
        super();
    }

    async refreshTokens(): Promise<boolean> {
        const isRefreshed = await super.refreshTokens();

        if (isRefreshed) {
            const me = await this.whoAmI();
            this.setMe(me);
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