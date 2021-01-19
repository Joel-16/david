var express = require('express');
var router = express.Router();
var cattle= require('../controller/cattle')
var pasture=require('../controller/pasture')
var apioptions={server:'http://localhost:3000'};
if (process.env.NODE_ENV==='production'){
    apioptions.server=' https://papa-joe.herokuapp.com/'
}

// cattle
router.get('/apiloc/herd', cattle.cattle);//to view all the data of all the cattle at once
router.get('/apiloc/herd/:id', cattle.cattleReadOne);//to view the data of exactly one of the cattle
router.post('/apiloc/herd', cattle.cattlecreate);//to add data of a new cattle
router.put('/apiloc/herd/:id', cattle.cattleUpdateOne);//to edit data of a single cattle
router.delete('/apiloc/:id', cattle.cattleDeleteOne);//to remove data of a single cattle


// land
router.get('/apiloc/land', pasture.landReadall);//to view all the data of all the lands at once
router.post('/apiloc/land', pasture.landcreate);//to add data of a new pasture
router.get('/apiloc/land/:id', pasture.landReadOne);//to view the data of exactly one of the land
router.put('/apiloc/land/:id', pasture.landUpdateOne);;//to edit data of a single land
router.delete('/apiloc/land/:id', pasture.landDeleteOne);//to remove data of a single pasture

module.exports=router;