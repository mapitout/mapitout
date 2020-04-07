import Controller from './controller';
const router = require('express').Router();

router.get('/', Controller.search);
//open_hour search
router.get('/:id', Controller.show);
router.post('/create', Controller.create);
router.put('/edit/:id', Controller.edit);
router.delete('/delete/:id', Controller.destroy);

export default router;
