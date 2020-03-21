# mapitout RESTful API v1 documentation

## BaseURI

- [base url][base url]:   `https://server.mapitout.com`
- [webhook][webhook]:     `https://server.mapitout.com/webhook`
- [open api][open api]:   `https://server.mapitout.com/openapi`
- [auth api][auth api]:   `https://server.mapitout.com/api`

notes: The first three route are publicly available.

[base url]: https://server.mapitout.com/
[webhook]: https://server.mapitout.com/webhook/
[open api]: https://server.mapitout.com/openapi/
[auth api]: https://server.mapitout.com/api/

## API Usage & Response

to use `/api` route, complete the following stpes:

- Login [mapitout](https://mapitout.com/#signin) to signup
- A `auth_jwt_token` will be generated and stored in your browser localStorage
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

#### Product

- POST `https://server.mapitout.com/api/product/createFromAmazon?source=XXX`
  - request sample:
  ```terminal
  POST https://server.mapitout.com/api/product/createFromAmazon?source=https://www.amazon.com/gp/product/B005FEGYJC
  ```
  - good response:
  ```json
  "5a87d194d2b4c919cb364a9c"
  ```
- GET `https://server.mapitout.com/api/product`
  - good response:
  ```json
  { "message": "/api/product connected" }
  ```
- GET `https://server.mapitout.com/api/product/getOneFromAmazon`
- GET `https://server.mapitout.com/api/getOneFromRevieweer?productId=XXX`
  - request sample:
  ```terminal
  GET https://server.mapitout.com/api/getOneFromRevieweer?productId=5a87d194d2b4c919cb364a9c
  ```
  - good response:
  ```json
    {
      "basic_info": {
          "imageURL": "https://images-na.ssl-images-amazon.com/images/I/51QkQmoDrUL._AC_US218_.jpg",
          "title": "LE Headlamp LED, 4 Modes Headlight, Battery Powered Helmet Light for Camping, Running, Hiking and Reading, 3 AAA Batteries Included",
          "link": "https://www.amazon.com/Headlamp-Headlight-Battery-Batteries-Included/dp/B005FEGYJC/ref=sr_1_1/134-0081924-2614903?ie=UTF8&qid=1518850452&sr=8-1&keywords=B005FEGYJC",
          "price": 7.99,
          "seller": "Lighting EVER"
      },
      "end": false,
      "_id": "5a87d194d2b4c919cb364a9c",
      "productId": "B005FEGYJC",
      "createdAt": "2018-02-17T06:54:12.638Z",
      "updatedAt": "2018-02-17T06:54:12.638Z",
      "__v": 0
    }
  ```
- GET `https://server.mapitout.com/api/admin`
  - good response:
  ```json
  {"message": "/api/admin connected"}
  ```