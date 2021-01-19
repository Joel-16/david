var mongoose=require('mongoose')
var farm=mongoose.model('farm')
var a="6005bb2e70cc9927d19a8738"

module.exports.cattlecreate=function(req,res){
   farm
      .findById(a)
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
  // sendstatus(res, 200, {'mess':'good'})
   farm
      .findById(a)
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
   if (req.params && req.params.id) {
      farm
         .findById(a)
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
   if (req.params && req.params.id) {
      farm
         .findById(a)
         .select ('-reviews -rating')
         .exec(
            function (err, location) {
               location.name = req.body.name;
               location.name = req.body.name;
               location.address = req.body.address;
               location.facilities = req.body.facilities.split(",");
               location.coords = [parseFloat(req.body.lng),parseFloat(req.body.lat)];
               location.openingTimes = [{
                  days: req.body.days1,
                  opening: req.body.opening1,
                  closing: req.body.closing1,
                  closed: req.body.closed1,
               }];
               location.save(function (err, location) {
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
   if (req.params && req.params.id) {
      farm
         .find(a)
         .select('herd')
         .exec((err, ans)=>{
            if (err){
               sendstatus(res, 404, {"message":"error"})
            }else if (!location){
               sendstatus(res, 404, {"message":"data does not exist"})
            }else{
               if (ans.herd && ans.herd.length > 0){
                  if (req.params.id<location.reviews.length){
                     ans.herd.splice(req.params.id, 1)
                     ans.save((err, ans)=>{
                        var thisreview
                        if (err){
                           sendstatus(res,400, err)
                        }else{
                           thisreview=ans.herd[ans.herd.length -1]
                           sendstatus(res, 201, null)
                        }
                     })
                  }
               }
            }
         })
   }
};


var sendstatus=(res,status,content)=>{
   res.status(status);
   res.json(content);
}