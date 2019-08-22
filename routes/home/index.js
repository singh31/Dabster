const express = require('express');
const router = express.Router() ; 
const Object = require('../../models/Object');

router.all ('/*' , (req, res, next)=>{ // router.all represents that every type of request is acceptable
    // '/*' means that every request that will come from admin/ will be accepted 

    req.app.locals.layout = 'home'; // this will override the home layout with home layout 
    next();
});

router.get('/', (req, res)=>{
    Object.find({}).then ( objects=> {
        res.render('home/index',{objects : objects});
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router ; 