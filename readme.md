<div align="center">
  <img src='https://github.com/mapitout/design/blob/master/assets/logo.png?raw=true' width='120px' alt='mapitout-logo.png'/>
  <h1>Mapitout</h1>
  <p>
    A crowdsourcing platform that everyone can update and share useful location based information with the community.
  </p>
</div>

---

## Initial Setup

```
$ git clone git@github.com:mapitout/mapitout.git
$ cd mapitout
$ ./scripts/setup.sh
```

## Develop

```
$ cd client
$ npm run dev
<!-- go to http://localhost:8080/ -->
```

```
$ cd server
$ npm run dev
<!-- go to http://localhost:8000/ -->
```

## Testing

```
$ npm run test
```

## Deploy

1. Deploy frontend: push/merge to master, will trigger this Travis Worker [![Build Status](https://travis-ci.org/mapitout/mapitout.svg?branch=master)](https://travis-ci.org/mapitout/mapitout) to build and push files to [this repo](https://github.com/mapitout/mapitout.github.io)
2. Deploy backend: run NPM scripts and it will push server subfoler to this [heroku app], (https://dashboard.heroku.com/apps/mapitout-server) only admin can perform such deployment, we suggest you send a PR and let the admin do it for you.
  ```
  $ npm run deploy:server
  ```

## Useful Links

- Github Repo: https://github.com/mapitout
- Issues: https://github.com/mapitout/mapitout/issues
- Application: https://mapitout.github.io
- Server: https://mapitout-server.herokuapp.com
- Google Analysis: https://analytics.google.com/analytics/web/?authuser=0#/report-home/a161563089w226557909p214189300

## License

MIT

## Help (!important)

- spread the words
- help adding your FAVORITES restaurants
- share this map with any restaurant owners
- share this map to other regions
- if you are a passionated developer who want to help this codebase and community
  - testing, either for nodejs backend or react frontend (using JEST)
  - adding new features:
    - check https://github.com/mapitout/mapitout/issues
