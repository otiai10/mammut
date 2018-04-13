import AccessToken, { IAccessTokenData } from "../AccessToken";

export interface IClientConfig {
    name: string;
    id: string;
    client_id: string;
    client_secret: string;
    rawurl: string;
    redirect_uri?: string;
}

export default class Client {

    public idStr: string;
    public id: string;
    public secret: string;
    public name: string;
    public rawurl: string;
    public redirectURI: string;

    public accessToken?: AccessToken;

    constructor(config: IClientConfig) {
        this.idStr = config.id;
        this.id = config.client_id;
        this.secret = config.client_secret;
        this.name = config.name;
        this.rawurl = config.rawurl;
        this.redirectURI = config.redirect_uri || "urn:ietf:wg:oauth:2.0:oob";
    }

    /**
     * authURL generates a URL for "/oauth/authorize" endpoint.
     * If the application is browser-based, it may `window.open` this URL.
     * If nodejs application, let the user copy the "authorization_code"
     * which is specified by Mastodon instance webpage, and paste the code
     * to your application.
     * @param params
     */
    public authURL(params: {scopes: string[]}): string {

        const url = new URL(this.rawurl);
        url.pathname = "/oauth/authorize";

        url.searchParams.append("client_id", this.id);
        url.searchParams.append("response_type", "code");
        url.searchParams.append("redirect_uri", this.redirectURI);

        url.searchParams.append("scope", params.scopes.join(" "));

        return url.href;
    }

    /**
     * get access_token with authorization_code.
     */
    public token(code: string): Promise<Client> {

        const url = new URL(this.rawurl);
        url.pathname = "/oauth/token";

        const formdata = new FormData();
        formdata.append("client_id", this.id);
        formdata.append("client_secret", this.secret);
        formdata.append("redirect_uri", this.redirectURI);
        formdata.append("grant_type", "authorization_code");
        formdata.append("code", code);

        return fetch(url.href, {body: formdata, method: "POST"})
        .then((res: Response) => res.json())
        .then((data: IAccessTokenData) => Promise.resolve(new AccessToken(data)))
        .then((token: AccessToken) => this.setAccessToken(token));
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
        formdata.append("scope", scopes.join("%20"));

        formdata.append("grant_type", "password"); // NOT RECOMMENDED
        formdata.append("username", email);
        formdata.append("password", password);

        return fetch(url.href, {body: formdata, method: "POST"})
        .then((res: Response) => res.json())
        .then((data: IAccessTokenData) => Promise.resolve(new AccessToken(data)));

    }

    private setAccessToken(token: AccessToken): Promise<Client> {
        this.accessToken = token;
        return Promise.resolve(this);
    }
}
