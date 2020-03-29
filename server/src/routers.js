import User from './user/controller';
import { loginRequired } from './middlewares';
import api from './api';
import publicApi from './publicApi';

const router = require('express').Router();
router.get('/', (req, res)=>res.send({message: 'connect to server.mapitout.com', webhook: 'https://mapitout-server.herokuapp.com/webhook', api: 'https://mapitout-server.herokuapp.com/api'}));
router.get('/webhook', (req, res)=>res.send({connection: true,timestamp: new Date().toUTCString()}));

router.post('/signupWithEmail', User.signupWithEmail);
router.post('/verifyEmailToken', User.verifyEmailToken);
router.post('/signup/:token', User.signup);
router.post('/signin', User.signin);
router.use('/publicApi', publicApi);
router.use('/api', loginRequired, api);

export default router;

