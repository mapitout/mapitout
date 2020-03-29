import Controller from './controller';
const router = require('express').Router();


router.get('/', (req, res)=> res.json({"message": "/publicApi/item connected"}));

router.get('/show', Controller.show);
router.post('/create', Controller.create);
router.put('/edit', Controller.edit);
router.delete('/delete', Controller.delete);


export default router;