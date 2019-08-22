const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    primary : {
        type: String, 
        required : true , 
        //unique : true
    },
    
    secondary : [{

        type : Schema.Types.ObjectId , 
        ref : 'scategories'

    }]

},{usePushEach : true });


module.exports = mongoose.model('pcategories' , CategorySchema);