const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectSchema = new Schema({

    /*category : {

        type : Schema.Types.ObjectId, // this will let us select id of the model
        ref  : 'categories' // reference from mongo db

    },*/

    title:{
        type: String,
        required : true
    },

    price: {
        type :  String,
        required: true
    },

    description:{
        type : String,
        required : true
    },
    
    pcategory: {
        type : Schema.Types.ObjectId, 
        ref : 'pcategories'
    },
    
    scategory : {
        type : Schema.Types.ObjectId,
        ref : 'scategories'
    },
    
    picture:{
        type : String,
        required : true
        
    },

    rating : {
        type: Number,
        required : true , 
        default : 5 
    },
 
    comment : [{

        type : Schema.Types.ObjectId, // this will let us select id of the model
        ref  : 'comments' // reference from mongo db

    }]

},{usePushEach : true});

module.exports = mongoose.model('objects' , ObjectSchema);