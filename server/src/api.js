import user from './user/router';
import bank from './bank/router';

const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api connected" }));

router.use('/user', user)
router.use('/bank', bank)

export default router;
