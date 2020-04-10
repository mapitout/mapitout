import Controller from './controller';
import multer from 'multer';
const router = require('express').Router();

const upload = multer({
  storage: multer.memoryStorage()
  // limits: { fileSize: 52428800 }
});

router.get('/', Controller.search);
//open_hour search
router.get('/:id', Controller.show);
router.post('/create', Controller.create);
router.post('/image', upload.single('mapitout_item_image'), Controller.uploadImage)
router.put('/edit/:id', Controller.edit);
router.delete('/delete/:id', Controller.destroy);

export default router;
