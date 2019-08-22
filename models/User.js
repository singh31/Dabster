const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    firstName:{
        type: String,
        required : true
    },

    lastName:{
        type: String,
        required : true
    },
    
    email: {
        type: String,
        required : true
    },

    password:{
        type: String,
        required : true
    },

    phno : {
        type : String,
        required : true
    },
    
    address : {
        type: String, 
        required : true
    },

    cart : {
        type : Schema.Types.ObjectId , 
        ref : 'Cart'
    }


});

module.exports = mongoose.model('users' , UserSchema);