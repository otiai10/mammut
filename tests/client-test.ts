import * as fetch from "jest-fetch-mock";

import AccessToken from "../src/AccessToken";
import Client from "../src/Client";
import Instance from "../src/Instance";

let instance: Instance;

beforeAll(() => {
    instance = new Instance("mstdn.otiai10.com");
});

describe("Client", () => {
    describe("tokenByPassword", () => {
        it("should return AccessToken with promise", (ok) => {
            fetch.mockResponseOnce(JSON.stringify({id: "12", client_id: "1234", client_secret: "abcde"}));
            instance.client({name: "test01", scopes: ["read", "write"]}).then((client) => {
                fetch.mockResponseOnce(JSON.stringify({access_token: "xyzw", scope: "read write"}));
                return client.tokenByPassword("otiai10@foobar.com", "foobarbaz");
            }).then((token) => {
                expect(token).toBeInstanceOf(AccessToken);
                expect(token.token).toBe("xyzw");
                ok();
            });
        });
    });

    describe("authURL", () => {
        it("should return a URL for /oauth/authorize", (ok) => {
            fetch.mockResponseOnce(JSON.stringify({id: "12", client_id: "1234", client_secret: "abcde"}));
            instance.client({
                name: "test01",
                redirect: "http://localhost:8080",
                scopes: ["read", "write"],
            }).then((client) => {
                const rawurl = client.authURL({scopes: ["read", "write"]});
                /* tslint:disable max-line-length */
                expect(rawurl).toBe("https://mstdn.otiai10.com/oauth/authorize?client_id=1234&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=read+write");
                ok();
            });
        });
    });
});
