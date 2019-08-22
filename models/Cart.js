const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({


    object : [{
        type : Schema.Types.ObjectId ,
         ref = 'objects'
    }]

},{usePushEach : true}) ; 

module.exports = mongoose.model('cart' , CartSchema);