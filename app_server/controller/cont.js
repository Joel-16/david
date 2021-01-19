module.exports.homepage= function( req ,res, next){   
    res.render('index', { title: 'Express' });
    sendstatus(res,200,{'message':'good'})
};

var sendstatus=(res,status,content)=>{
    res.status(status);
    res.json(content);
 }