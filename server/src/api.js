import user from './user/router';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api connected" }));

router.use('/user', user)

export default router;
