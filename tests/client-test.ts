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
            instance.client({name: "test01", scopes: "read write"}).then((client) => {
                fetch.mockResponseOnce(JSON.stringify({access_token: "xyzw", scope: "read write"}));
                return client.tokenByPassword("otiai10@foobar.com", "foobarbaz");
            }).then((token) => {
                expect(token).toBeInstanceOf(AccessToken);
                expect(token.token).toBe("xyzw");
                ok();
            });
        });
    });
});
