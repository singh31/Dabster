const express = require('express');
const router = express.Router() ; 
const PCategory = require('../../models/PCategory');
const Scategory = require('../../models/SCategory');

router.all ('/*', (req, res, next)=>{ // router.all represents that every type of request is acceptable
    // '/*' means that every request that will come from admin/ will be accepted 

    req.app.locals.layout = 'admin'; // this will override the home layout with admin layout 
    next();
});

router.get('/', (req, res) => {
    PCategory.find({}).populate('secondary').then(categories=>{
        res.render('admin/category/index', {categories : categories}); // 'render' goes into views directory and will look for something like 'home'
        
    });
    
    
});


router.post('/create', (req, res) => {


    PCategory.findOne({primary : req.body.primaryCategory}).then(category=> {
       
        if(category)
        {
            console.log('primary category found');
            const newSCategory = new Scategory({
                
                secondary : req.body.secondaryCategory,
                }) ;
                console.log('secondary category created') ; 

                if(!Array.isArray(category.secondary))
                {
                    category.secondary = [] ; 
                }

                category.secondary.push(newSCategory) ; 
                console.log('secondary pushed into primary'); 

                category.save().then(savedCategory=>{

                   newSCategory.save().then(savedscategory => { 

                    res.redirect('/admin/categories');
                   
                }).catch(err=>{
                       if(err)
                       console.log('error occured' + err) ;
                   });

                     
               }).catch(err=> { 
                    if(err)
                    {
                        console.log('error occurred' + err);
                    }
                });
            
        }

        else
        {

            const newSCategory = new Scategory({

                secondary : req.body.secondaryCategory,
            }) ; 

            const newCategory =  new PCategory({
                primary : req.body.primaryCategory    
            });

            newCategory.secondary.push(newSCategory); 
        

        newCategory.save().then(savedCategory=>{

            newSCategory.save().then (savedScategory => { 
                res.redirect('/admin/categories'); 
            }).catch(err=>{
                if(err)
                console.log(err) ; 
            })

        }).catch(err=>{
            if(err)
            console.log(err) ; 
        });

    }
    })
    /*
    const newCategory  = PCategory({
    
        primary = req.body.primaryCategory,        
        
        PCategory.find({primary : primary}).then(category => {
            const newScategory = SCategory({
                secondary : req.body.secondaryCategory,
            });

            category.secondary.push(newScategory);
        })

    });*/

  
});

router.get('/edit/:id', (req, res) => {

Category.findOne({_id : req.params.id}).then(category=>{
    res.render('admin/category/edit', {category : category});
    });

});


router.put('/edit/:id', (req, res) => {

    Category.findOne({_id : req.params.id}).then(category=>{
        category.primary = req.body.primary;
        category.secondary = req.body.secondary ;
        category.save().then(savedCategory=>{
            res.redirect('/admin/categories');
        })
    });

   
});

/*router.get('/delete/:id', (req,res)=>{
    Category.findOne({_id: req.params.id}).then(category =>{
        res.render('admin/categories/delete',{category : category})
    })
});
*/
router.delete('/:id', (req,res)=>{


    PCategory.findOne({_id: req.params.id}).populate('secondary').then(post=>{
            
        if(!post.secondary.length < 1)
        {
            post.secondary.forEach(secondary=>{
  
                secondary.remove();
            });
        }
        
        post.remove();  
        
        
        
        res.redirect('/admin/categories');
    });
});

module.exports = router ;