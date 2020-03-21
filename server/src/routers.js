import User from './user/controller';
import { loginRequired } from './middlewares';
import api from './api';

const router = require('express').Router();
router.get('/', (req, res)=>res.send({message: 'connect to server.mapitout.com', webhook: 'https://server.mapitout.com/webhook', openapi:'https://server.mapitout.com/openapi', api: 'https://server.mapitout.com/api'}));
router.get('/webhook', (req, res)=>res.send({connection: true,timestamp: new Date().toUTCString()}));

router.post('/signupWithEmail', User.signupWithEmail);
router.post('/verifyEmailToken', User.verifyEmailToken);
router.post('/signup/:token', User.signup);
router.post('/signin', User.signin);

router.use('/api', loginRequired, api);

export default router;
