var request=  require('request')
var apioptions={server:'http://localhost:3000/'};
if (process.env.NODE_ENV==='production'){
    apioptions.server=' https://papa-joe.herokuapp.com/'
}

module.exports.homepage= function( req ,res, next){
    var requestopt, path;
    path='api/apiloc/';
    requestopt={
        url:apioptions.server+path,
        method: 'GET',
        port: 3000,
        json:{},
        qs:{
            lng: -0.7992599,
            lat: 51.378091,
            maxdistance:20
        }
    }
    request(requestopt, (err, response, body)=>{
        if (err){
            console.log(err)
        }else if(response.statusCode===200){
            console.log(body)
            renderhome(req,res)
        }else{
            console.log(response.statusCode)
        }  
    })
    
};

var renderhome=(req,res)=>{
    res.render('home', {
        title:'My',
        pageheader:{
            title:'My',
            strapline:'Find places to work with wifi near you'
        },
        locations:[{
            name: 'Starcups',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 3,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '100m'
        },{
            name: 'Cafe Hero',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 4,
            facilities: ['Hot drinks', 'Food', 'Premium wifi'],
            distance: '200m'
        },{
            name: 'Burger Queen',
            address: '125 High Street, Reading, RG6 1PS',
            rating: 2,
            facilities: ['Food', 'Premium wifi'],
            distance: '250m'
        }],
        sidebar:'Looking for Wifi and a seat?My helps you find places to work when out and about'
    });
}