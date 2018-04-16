# mammut

```sh
npm install
npm start
```

```js
import mammut from "mammut";

const instance = new mammut.Instance("mstdn.jp");

instance
    .client({
        name: "Test",
        scopes: ["read", "write"],
        redirect: "http://localhost:8080",
    })
    .then(client => {
        const authenticationURL = client.authURL();
        window.open(authenticationURL);
        // Let the user authenticate your app in the instance's web page.
        // Then you can get callback access to that "redirect" url,
        // with authentication code as `?code=xxxxxxx`
    });
```