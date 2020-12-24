This is multi-signature validator for HBD potato project.

It creates an API that accept raw transaction and will return signature if it matched required conditions.

---

Method: `POST`
Endpoint: `/`

Required body:

`apiKey`: predetermined API key for authentication.

`transaction`: raw transaction (string)

Response:

```
{
  error: true/false,
  signature: signature/null
}
```
