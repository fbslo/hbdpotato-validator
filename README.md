This is multi-signature validator for HBD potato project.

It creates an API that accept raw transaction and will return signature if it matched required conditions (operation is `convert`, `limit_order_cancel`, `limit_order_create`, `limit_order_create2` and transaction includes only 1 one operation).

---

*How to use?*

Requirement: NodeJS & NPM.

Rename `.env.example` to `.env`, add config details.

Run `npm i && node index.js`

---

*Method:* `POST`

*Endpoint:* `/`

*Required body:*

`apiKey`: predetermined API key for authentication.

`transaction`: raw transaction (string)

*Response:*

```
{
  error: true/false,
  signature: signature/null
}
```

---

Created with :heart: by @fbslo
