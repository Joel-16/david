module.exports.homepage= function( req ,res, next){
            
    
};

var sendstatus=(res,status,content)=>{
    res.status(status);
    res.json(content);
 }