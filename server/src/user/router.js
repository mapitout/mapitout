import Controller from './controller';

import multer from 'multer';
const router = require('express').Router();

const upload = multer({
  storage: multer.memoryStorage()
  // limits: { fileSize: 52428800 }
});

router.get('/', (req, res)=>res.json({ "message": "/api/user connected" }));

router.get('/profile', (req, res)=>{
  req.user.password = null;
  return res.send(req.user)
});
router.post('/profile/avatar', upload.single('avatar'), Controller.updateProfileAvatar);
router.post('/profile', Controller.updateProfile);

// router.use(`/admin`, Middleware.loginRequired, Middleware.adminReuired, admin);

export default router;