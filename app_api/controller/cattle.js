var mongoose=require('mongoose')
var farm=mongoose.model('farm')
var a="6005bb2e70cc9927d19a8738"

module.exports.cattlecreate=function(req,res){
/* 
   This function is incharge of adding cattles
   whenever they are bought or given birth to
*/
   farm
      .find({name:'david'})
      .select('name herd')
      .exec((err, ans)=>{
         if (err){
            sendstatus(res,400, err)
         }else{
            ans.herd.push({
               age:req.body.age,
               gender:req.body.gender,
               weight:req.body.weight,
               color:req.body.color,
               health:req.body.health,
               price:req.body.price,
               entry:req.body.entry
            })
            q=ans.herd[ans.herd.length -1]
            q.location.push(req.body.location)
            console.log(q)
            ans.save((err, ans)=>{
               var thiscattle
               if (err){
                  sendstatus(res,400, err)
               }else{
                  thiscattle=ans.herd[ans.herd.length -1]
                  sendstatus(res, 201, thiscattle)
               }
            })
         }
      })
}
module.exports.cattle=function(req,res){
/* 
   This function is incharge of viewig all the basic data of the cattle
   basically for debugging purpose
*/
  // sendstatus(res, 200, {'mess':'good'})
   farm
      .find({name:'david'})
      .select('herd -_id')
      .exec(function (err, ans) {
         var response;
         if (!ans) {
            sendstatus(res, 404, {"message": "couldnt find data"});
            return;
         } else if (err) {
            sendstatus(res, 404, err);
            return;
         }//sendstatus(res,200,ans)
         sendstatus(res,200,ans.herd)
      })
};
module.exports.cattleReadOne=function(req,res){
/* 
   This function is incharge of viewing the basic data of 
   a single cattle
*/
   if (req.params && req.params.id) {
      farm
         .find({name:'david'})
         .select('herd')
         .exec(function (err, ans) {
            var response;
            if (!ans) {
               sendstatus(res, 404, {"message": "couldnt find data"});
               return;
            } else if (err) {
               sendstatus(res, 404, err);
               return;
            }
            if (ans.herd && ans.herd.length > 0) {
               herd = ans.herd[req.params.id];
               if (!herd) {
                  sendstatus(res, 404, {
                     "message": "there is no section for herd"
                  });
               } else {
                  response = {
                     cattle: herd
                  };
                  sendstatus(res, 200, response);
               }
            } else {
               sendstatus(res, 404, {
                  "message": "No reviews found"
               });
            }
         })
      } else {
         sendstatus(res, 404, {
            "message": "No cattle found"
         });
      }
};
module.exports.cattleUpdateOne=function(req,res){
/* 
   This function is incharge of editing the basic data
   of the cattle    
*/
   if (req.params && req.params.id) {
      farm
         .find({name:'david'})
         .select ('name herd')
         .exec((err, ans)=>{
            herd=ans.herd[req.params.id]
            if (!herd){
               sendstatus(res,404, {"message":"no herd data found"})
            }else {
               herd.age=req.body.age
               herd.gender=req.body.gender,
               herd.weight=req.body.weight,
               herd.color=req.body.color,
               herd.health=req.body.health,
               herd.price=req.body.price,
               herd.entry=req.body.entry
            }
               q=ans.herd[req.params.id]
               q.location.push(req.body.location)
               ans.save(function (err, location) {
                  if (err) {
                     sendstatus(res, 404, err);
                  } else {
                     sendstatus(res, 200, location);
                  }
               });
            }
         );
   } else{
         sendstatus(res, 404, {"message": "no id found"});
   };
}
module.exports.cattleDeleteOne = function (req, res) {
/* 
   This function is incharge of removing cattles
   whenever they are sold or die
*/
   if (req.params && req.params.id) {
      farm
         .find({name:'david'})
         .select('name herd')
         .exec((err, ans)=>{
            if (err){
               sendstatus(res,400, err)
            }else{
               if (ans.herd && ans.herd.length > 0){
                  if (req.params.id<ans.herd.length){
                     ans.herd.splice(req.params.id, 1)
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
};
module.exports.cattleAssign=(req,res)=>{
/* this function assign a particular cattle to a secific pasture*/
   if (req.params && req.params.id) {
      farm
         .find({name:'david'})
         .select ('name herd')
         .exec((err, ans)=>{
            herd=ans.herd[req.params.id]
            if (!herd){
               sendstatus(res,404, {"message":"no herd data found"})
            }else {
               q=ans.herd[req.params.id]
               q.location.push(req.body.location)
               ans.save(function (err, location) {
                  if (err) {
                     sendstatus(res, 404, err);
                  } else {
                     sendstatus(res, 200, location);
                  }
               });
            }
              
         });
   } else{
         sendstatus(res, 404, {"message": "no id found"});
   };
}
module.exports.cattleUnassign=(req,res)=>{
   if (req.params && req.params.id) {
      farm
         .find({name:'david'})
         .select('name herd')
         .exec((err, ans)=>{
            if (err){
               sendstatus(res,400, err)
            }else{
               if (ans.herd && ans.herd.length > 0){
                  if (req.params.id<ans.herd.length){
                     ans.herd[req.params.id].location.splice(ans.herd[req.params.id].location.length -1, 1)
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