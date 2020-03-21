import Controller from './controller';
const router = require('express').Router();

router.get('/', (req, res)=>res.json({ "message": "/api/bank connected" }));

router.post('/create_access_token', Controller.creatAccessToken);
router.post('/get_transactions', Controller.getTransactions);
router.get('/transactions', Controller.getTransactions);

export default router;
