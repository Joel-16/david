var mongoose=require('mongoose');
var schema= mongoose.Schema;
var cattle= new schema({
   age:{type:Number},
   gender:{type:String},
   weight:{type:Number},
   color:{type:String},
   health:{type:Boolean},
   price:{type:Number},
   location: [String],
   entry:{type:String}
})
var pasture=new schema({
   temp:[Number],
   grass:[Boolean],
   population:[Number]
})
var farmschema=new schema({
   land: [pasture],
   herd: [cattle],
});
mongoose.model('farm', farmschema, 'farms')