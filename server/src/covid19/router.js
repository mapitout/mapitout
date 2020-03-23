import CACounty from './CACounty'
const router = require('express').Router();


router.get('/', (req, res)=> res.json({"message": "/public/covid19 connected"}));

router.get('/countyOfCA', CACounty.getdata)


export default router;