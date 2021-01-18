var express = require('express');
var router = express.Router();
var cattle= require('../controller/farm')
var pasture=require('../controller/review')
var apioptions={server:'http://localhost:3000'};
if (process.env.NODE_ENV==='production'){
    apioptions.server=' https://papa-joe.herokuapp.com/'
}

// locations
router.get('/apiloc', cattle.locations);
router.post('/apiloc', cattle.locationscreate);
router.get('/apiloc/:id', cattle.locationsReadOne);
router.put('/apiloc/:id', cattle.locationsUpdateOne);
router.delete('/apiloc/:id', cattle.locationsDeleteOne);


// reviews
router.post('/apiloc/:id/reviews', pasture.reviewscreate);
router.get('/apiloc/:id/reviews/:reviewid', pasture.reviewsReadOne);
router.get('/apiloc/:id/reviews', pasture.reviewsReadall);
router.put('/apiloc/:id/reviews/:reviewid', pasture.reviewsUpdateOne);
router.delete('/apiloc/:id/reviews/:reviewid', pasture.reviewsDeleteOne);

module.exports=router;