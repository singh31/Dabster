const express = require('express');
const router = express.Router() ; 
const Object = require('../../models/Object');
const PCategories = require('../../models/PCategory');
const SCategories = require('../../models/SCategory');
router.all ('/*' , (req, res, next)=>{ // router.all represents that every type of request is acceptable
    // '/*' means that every request that will come from admin/ will be accepted 

    req.app.locals.layout = 'home'; // this will override the home layout with home layout 
    next();
});

router.get('/', (req, res)=>{
    Object.find({}).then ( objects=> {
        PCategories.find({}).populate('secondary').then( pcategories=> {
            res.render('home/object/index',{objects : objects , pcategories : pcategories});
        }).catch(err=>{
            if (err)
            console.log(err);
        });
        
    }).catch(err=>{
        console.log(err);
    })
}) ; 


//objects to display as per category
router.get('/:pid/:sid' , (req,res)=> { 


    PCategories.findOne({_id: req.params.pid}).then(pc=> { 

        SCategories.findOne({_id : req.params.sid}).then (sc=> { 
            const title = pc.primary +' ' +sc.secondary ; 
            Object.find({pcategory : pc , scategory : sc}).then(objects=> {
                PCategories.find({}).populate('secondary').then(pcategories=> { 

                res.render('home/object/index', {objects : objects, pcategories : pcategories , title : title}) ; 

                }).catch(err)
                {
                    if(err)
                    {
                        console.log('err4' + error);
                    }
                }
            }).catch(err=>{
                if(err)
                console.log('error occured1' + err) ; 
            })

        }).catch(err => {
            if(err)
            console.log('error occured2' + err); 
        })
    }).catch(err=>{
        if(err)
        console.log(  err); 
    })



});


//display single object
router.get('/:id' , (req, res)=>{

});

//template just to test
router.get('/template', (req, res)=>{
    res.render('home/object/template');
}) ; 



module.exports = router ; 