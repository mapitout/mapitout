# mapitout RESTful API v1 documentation

## BaseURI

- [base url][base url]:   `https://server.mapitout.com`
- [webhook][webhook]:     `https://server.mapitout.com/webhook`
- [auth api][auth api]:   `https://server.mapitout.com/api`

notes: The first three route are publicly available.

[base url]: https://server.mapitout.com/
[webhook]: https://server.mapitout.com/webhook/
[auth api]: https://server.mapitout.com/api/

## API Usage & Response

to use `/api` route, complete the following stpes:

- Login [mapitout](https://mapitout.com/#signin) to signup
- A `mapitout_auth_jwt_token` will be generated and stored in your browser localStorage
- This token will expired in 7 days, to request an extended token, [contact]((team@mapitout.com)) us
- Every API endpoint requires an `Authentication` header

Example:

```javascript
request.headers['Authorization'] = `token`
```

### Endpoints

#### Account

- GET `https://server.mapitout.com/api`
  - good response
  ```json
  {"message": "/api connected"}
  ```
  - bad response
  ```json
  "Please make sure your request has an Authorization header."
  ```
- GET `https://server.mapitout.com/api/user/profile`
- POST `https://server.mapitout.com/api/user/profile`
