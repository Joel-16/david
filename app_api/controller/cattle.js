var mongoose=require('mongoose')
var farm=mongoose.model('farm')
var a={name:'david'}

module.exports.cattlecreate=function(req,res){
   farm
      .find(a)
      .select('herd')
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
               entry:{type:String}
            })
            ans.herd.location.push({
               location:req.body.location
            })
            ans.save((err, ans)=>{
               var thiscattle
               if (err){
                  sendstatus(res,400, err)
               }else{
                  loc=ans
                  thiscattle=ans.herd[ans.herd.length -1]
                  sendstatus(res, 201, thiscattle)
               }
            })
         }
      })
}
module.exports.cattle=function(req,res){
   farm
      .find(a)
      .select('herd')
      .exec(function (err, ans) {
         var  review, response;
         if (!ans) {
            sendstatus(res, 404, {"message": "couldnt find data"});
            return;
         } else if (err) {
            sendstatus(res, 404, err);
            return;
         }
         if (ans.herd && ans.herd.length > 0) {
            herd = ans.herd;
            if (!herd) {
               sendstatus(res, 404, {
                  "message": "there is no section for herd"
               });
            } else {
               response = {
                  review: herd
               };
               sendstatus(res, 200, response);
            }
         } else {
            sendstatus(res, 404, {
               "message": "No reviews found"
            });
         }
      }
      );
} else {
   sendstatus (res, 404, {
      "message": "Not found, locationid and reviewid are both required"
   });
}
};
module.exports.cattleReadOne=function(req,res){
   if (req.params && req.params.id) {
      farm
         .findById(req.params.id)
         .exec(function (err, location) {
            if (!location) {
               sendstatus(res, 404, {
                  "message": "couldnt find data"
               });
               return;
            } else if (err) {
               sendstatus(res, 404, err);
               return;
            }
            sendstatus(res, 200, location);
         });
   } else {
      sendstatus(res, 404, {
         "message": "no id found"
      });
   }
};
module.exports.cattleUpdateOne=function(req,res){
   if (req.params && req.params.id) {
      farm
         findById(req.params.id)
         select ('-reviews -rating')
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
   var locationid = req.params.locationid;
   if (locationid) {
      farm
         .findByIdAndRemove(locationid)
         .exec(
            function (err, location) {
               if (err) {
                  sendstatus(res, 404, err);
                  return;
               }
               sendJsonResponse(res, 204, null);
            }
         );
   } else {
      sendstatus(res, 404, {
         "message": "No locationid"
      });
   }
};


var sendstatus=(res,status,content)=>{
   res.status(status);
   res.json(content);
}