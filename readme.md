<div align="center">
  <img src='https://github.com/mapitout/design/blob/master/assets/logo.png?raw=true' width='120px' alt='mapitout-logo.png'/>
</div>

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
2. Deploy backend: run NPM scripts and it will push server subfoler to this [heroku app](https://dashboard.heroku.com/apps/mapitout-server)
  ```
  $ npm run deploy:server
  ```

## Links

- Github: https://github.com/mapitout
- Frontend: https://mapitout.github.io/
- Backend: https://mapitout-server.herokuapp.com/
- Google Analysis: https://analytics.google.com/analytics/web/?authuser=0#/report-home/a161563089w226557909p214189300

## License

MIT
