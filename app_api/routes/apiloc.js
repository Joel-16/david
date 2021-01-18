var express = require('express');
var router = express.Router();
var cattle= require('../controller/cattle')
var pasture=require('../controller/pasture')
var apioptions={server:'http://localhost:3000'};
if (process.env.NODE_ENV==='production'){
    apioptions.server=' https://papa-joe.herokuapp.com/'
}

// cattle
router.get('/apiloc/herd', cattle.cattle);
router.get('/apiloc/herd/:id', cattle.cattleReadOne);
router.post('/apiloc/herd', cattle.cattlecreate);
router.put('/apiloc/:id', cattle.cattleUpdateOne);
router.delete('/apiloc/:id', cattle.cattleDeleteOne);


// land
router.get('/apiloc/land', pasture.landReadall);
router.post('/apiloc/land', pasture.landcreate);
router.get('/apiloc/land/:id', pasture.landReadOne);
router.put('/apiloc/land/:id', pasture.landUpdateOne);
router.delete('/apiloc/land/:id', pasture.landDeleteOne);

module.exports=router;