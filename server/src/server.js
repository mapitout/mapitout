import express from 'express';
import {createServer} from 'http';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import routers from './routers';
import config from './config';

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 20 // limit each IP to 20 requests per windowMs
});

// DB Setup
mongoose.connect(config.mongoose.uri, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .catch(err=>console.error(err));
mongoose.Promise = global.Promise;

// App Setup
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routers);
app.use(errorHandler);
app.use(limiter);

function errorHandler (err, req, res, next) {
  console.log('errrrrr', err)
  const error = ((typeof err) == 'string' && err.search(':')>0)?err.split(':'):err;
  let [statusCode, msg] = (error.length > 1)?error:[500, err];
  (res.headersSent)?next(msg):res.status(statusCode).send(msg);
}

// Server Setup
const port = process.env.PORT || 8000;
createServer(app).listen(port, ()=>{
  console.log(`\x1b[32m`, `> Server listening on ${port}`, `\x1b[0m`)
});
