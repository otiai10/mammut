export interface IAccessTokenData {
    access_token: string;
    token_type: string;
    scope: string;
    created_at: number;
}

export default class AccessToken {

    public token: string;
    public type: string;
    public scope: string[] = [];
    public created: number;

    constructor(data: IAccessTokenData) {
        this.token = data.access_token;
        this.type = data.token_type;
        this.scope = data.scope.split(" ");
        this.created = data.created_at;
    }
}
