import Controller from './controller';
const router = require('express').Router();


router.get('/', (req, res)=> res.json({"message": "/publicApi/item connected"}));
//category search
//open_hour search
//long, lati search
router.get('/all', Controller.showAll);
router.get('/:id', Controller.show);
router.post('/create', Controller.create);
router.put('/edit/:id', Controller.edit);
router.delete('/delete/:id', Controller.destroy);



export default router;