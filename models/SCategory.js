const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    secondary : {
        type: String, 
        required : true
    }
    
});


module.exports = mongoose.model('scategories' , CategorySchema);