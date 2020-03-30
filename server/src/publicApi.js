import covid from './covid19/router';
import item from './item/router';
import category from './category/router';
const router = require('express').Router();

router.get('/', (req, res) => res.json({"message": "/public conneted"}));

router.use('/covid19', covid);
router.use('/item', item);
router.use('/category', category);

export default router;