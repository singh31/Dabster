const express = require('express');
const { isEmpty} = require('../../helpers/upload-helper');
const router = express.Router() ; 
const Object = require('../../models/Object');
const Pcategory = require('../../models/PCategory');

router.all ('/*' , (req, res, next)=>{ // router.all represents that every type of request is acceptable
    // '/*' means that every request that will come from admin/ will be accepted 

    req.app.locals.layout = 'admin'; // this will override the home layout with home layout 
    next();
});

router.get('/', (req, res)=>{

    Pcategory.find({}).populate('secondary').then(pcategories => {
        res.render('admin/object/createObject', {pcategories : pcategories});
    })
    
});


router.get('/objects' , (req, res)=>{

    Object.find({}).then( objects => {
        res.render('admin/object/index', {objects : objects});
    }).catch(err=>{
        console.log(err);
    });
});




router.post('/objects/create', (req,res)=>{

   // console.log(req.body.category);
    let filename = '' ; 
    if(!isEmpty(req.files))
    {
        //console.log('Not EMPTY');
        let file = req.files.picture;
         filename = Date.now() +'-' +file.name; 
        let dirUploads = './public/uploads/';
        file.mv(dirUploads + filename , err=>{
            if(err) throw err;
        });
    }
    
    
    

    const newObject = new Object({
        title : req.body.title,
        description : req.body.description,
        picture : filename,
        category : req.body.category,
        price : req.body.price ,
        quantity  : req.body.quantity


    });

    newObject.save().then(savedPost => { 
        console.log('savedPost');
        req.flash('success_message' , `Object : ${savedPost.title} was saved successfully`);
        
        res.redirect('/admin/objects');
    }).catch(err=>{
        console.log(err);
    });
})



module.exports = router ;  