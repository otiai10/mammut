import Client from "../Client";
import {httperrorcheck} from "../utils";

export declare interface IClientOption {
    name: string;
    scopes: string[];
    redirect?: string;
}

/**
 * Instance class represents a Mastodon Instance (or hostname, actually).
 */
export default class Instance {

    public url: URL;

    constructor(host: string) {
        if (!/^https?:\/\//.test(host)) {
            host = "https://" + host;
        }
        const url = new URL(host);
        this.url = url;
    }

    public client(opt: IClientOption): Promise<Client> {

        opt.redirect = opt.redirect || "urn:ietf:wg:oauth:2.0:oob";

        const url = new URL(this.url.href);
        url.pathname = "/api/v1/apps";

        const formdata = new FormData();
        formdata.append("client_name", opt.name);
        formdata.append("redirect_uris", opt.redirect);
        formdata.append("scopes", opt.scopes.join(" "));

        return fetch(url.href, {body: formdata, method: "POST"})
        .then(httperrorcheck)
        .then((config: any) => Promise.resolve(new Client({
            rawurl: this.url.toString(),
            redirect_uri: opt.redirect,
            ...config,
        })));
    }
}
