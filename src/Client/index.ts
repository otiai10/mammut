import AccessToken, { IAccessTokenData } from "../AccessToken";

export interface IClientConfig {
    name: string;
    id: string;
    client_id: string;
    client_secret: string;
    rawurl: string;
}

export default class Client {

    public idStr: string;
    public id: string;
    public secret: string;
    public name: string;
    public rawurl: string;

    constructor(config: IClientConfig) {
        this.idStr = config.id;
        this.id = config.client_id;
        this.secret = config.client_secret;
        this.name = config.name;
        this.rawurl = config.rawurl;
    }

    /**
     * tokenByPassword is never recommended because consumer must know the users' email/password.
     * @param email
     * @param password
     * @param scopes
     */
    public tokenByPassword(email: string, password: string, scopes: string[] = []): Promise<AccessToken> {

        const url = new URL(this.rawurl);
        url.pathname = "/oauth/token";

        const formdata = new FormData();
        formdata.append("client_id", this.id);
        formdata.append("client_secret", this.secret);
        formdata.append("scope", scopes.join(" "));

        formdata.append("grant_type", "password"); // NOT RECOMMENDED
        formdata.append("username", email);
        formdata.append("password", password);

        return fetch(url.href, {body: formdata, method: "POST"})
        .then((res: Response) => res.json())
        .then((data: IAccessTokenData) => Promise.resolve(new AccessToken(data)));

    }

}
