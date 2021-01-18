var mongoose=require('mongoose');
var schema= mongoose.Schema;
var cattle= new schema({
   age:{type:Number},
   gender:{type:String},
   weight:{type:Number},
   color:{type:Number},
   health:{type:Boolean},
   price:{type:Number},
   location: [String]
})
var pasture=new schema({
   temp:[Number],
   grass:[Boolean],
   population:[Number]
})
var farmschema=new schema({
   feeding: [pasture],
   herd: [cattle],
});
mongoose.model('farm', farmschema, 'farms')