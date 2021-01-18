var express = require('express');
var router = express.Router();
var cont= require('../controller/cont')

/* GET home page. */
router.get('/',cont.homepage )


module.exports = router;
