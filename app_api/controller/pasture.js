var mongoose=require('mongoose')
var farm=mongoose.model('farm')
var a="6005bb2e70cc9927d19a8738"

module.exports.landcreate=function(req,res){
/*
thus function creates the pasture to David's taste
*/
   farm
      .findById(a)
      .select('name land')
      .exec((err, ans)=>{
         if (err){
            sendstatus(res,400, err)
         }else{
            console.log(ans.land)
            ans.land.push({
               grass:req.body.grass,
               temp:req.body.temp,
               population: req.body.population
            })
            ans.save((err, ans)=>{
               var thisland
               if (err){
                  sendstatus(res,400, err)
               }else{
                  thisland=ans.land[ans.land.length -1]
                  sendstatus(res, 201, thisland)
               }
            })
         }
      })
}
module.exports.landReadOne=function(req,res){
/*
this function lets you view the basic data of eave pasture
*/
   if (req.params && req.params.id) {
      farm
         .findById(a)
         .select('land -_id')
         .exec(function (err, ans) {
            var  response;
            if (!ans){
               sendstatus(res, 404, {"message": "couldnt find data"});
            } else if(err) {
               sendstatus(res, 404, err)
               return;
            }
            if (ans.land.length > 0) {
               response = {
                  data : ans.land[req.params.id]
               };
               sendstatus(res, 200, response);
            } else {
               sendstatus(res, 404, {'message':'no data found'});
            }
         });
   } else {
      sendstatus (res, 404, {
         "message": "id Not found"
      });
   }
};
module.exports.landReadall=function(req,res){
   farm
      .findById(a)
      .select('land -_id')
      .exec(function (err, ans) {
         var response;
         if (!ans) {
            sendstatus(res, 404, {"message": "couldnt find data"});
            return;
         } else if (err) {
            sendstatus(res, 404, err);
            return;
         }//sendstatus(res,200,ans)
         sendstatus(res,200,ans)
      })
   
};
module.exports.landUpdateOne=function(req,res){
   if (req.params && req.params.id) {
      farm
         .findById(a)
         .select ('land')
         .exec((err, ans)=>{
            land=ans.land[req.params.id]
            if (!land){
               sendstatus(res,404, {"message":"no land data found"})
            }else {
               land.grass.push(req.body.grass),
               land.temp.push(req.body.temp),
               land.population.push(req.body.population)
            }
            ans.save(function (err, location) {
               if (err) {
                  sendstatus(res, 404, err);
               } else {
                  sendstatus(res, 200, location);
               }
            });
            
         });
   } else{
         sendstatus(res, 404, {"message": "no id found"});
   };
}
module.exports.landDeleteOne=function(req,res){
   if (req.params && req.params.id) {
      farm
         .findById(a)
         .select('name land')
         .exec((err, ans)=>{
            if (err){
               sendstatus(res,400, err)
            }else{
               if (ans.land && ans.land.length > 0){
                  if (req.params.id<ans.land.length){
                     ans.land.splice(req.params.id, 1)
                     ans.save((err, ans)=>{
                        if (err){
                           sendstatus(res,400, err)
                        }else{
                           sendstatus(res, 201, {"message":"successful"})
                        }
                     })
                  } else {
                     sendstatus (res, 404, {
                        "message": "put a verifiable id "
                     });
                  }
               } else {
                  sendstatus (res, 404, {
                     "message": "No herd file found"
                  });
               }
            }
         })
   }else{
      sendstatus (res, 404, {
         "message": "Not found, locationid and reviewid are both required"
      });
   }
}




var sendstatus=(res,status,content)=>{
   res.status(status);
   res.json(content);
}