import Controller from './controller';
const router = require('express').Router();

router.get('/', (req, res)=> res.json({"message": "/publicApi/category connected"}));
router.get('/all', Controller.showAll)
router.post('/create', Controller.create)

export default router;
