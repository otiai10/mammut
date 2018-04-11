import * as fetch from "jest-fetch-mock";

import Client from "../src/Client";
import Instance from "../src/Instance";

describe("Instance", () => {
    it("should be true", () => {
        expect(true).toBe(true);
    });
    describe("constructor", () => {
        it("should create an instance of mastodon", () => {
            const instance = new Instance("myhost.jp");
            expect(instance).toBeInstanceOf(Instance);
        });
    });
    describe("client", () => {
        it("should create a client on this mastodon instance", (ok) => {
            fetch.mockResponseOnce(JSON.stringify({
                id: "12345",
            }));
            const instance = new Instance("mstdn.otiai10.com");
            instance.client({name: "TestTest", scopes: "read write"}).then((client) => {
                expect(client).toBeInstanceOf(Client);
                expect(client.idStr).toBe("12345");
                ok();
            });
        });
    });
});
