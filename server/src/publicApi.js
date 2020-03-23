import covid from './covid19/router';

const router = require('express').Router();

router.get('/', (req, res) => res.json({"message": "/public conneted"}));

router.use('/covid19', covid)

export default router;