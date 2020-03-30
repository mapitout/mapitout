import Controller from './controller';
const router = require('express').Router();


router.get('/', (req, res)=> res.json({"message": "/publicApi/item connected"}));

router.get('/all', Controller.showAll)
router.get('/:id', Controller.show);
router.post('/create', Controller.create);
router.put('/edit/:id', Controller.edit);
router.delete('/delete/:id', Controller.destroy);



export default router;