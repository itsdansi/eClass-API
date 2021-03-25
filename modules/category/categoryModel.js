const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({

    title : {
        type : String,
         required : true,
    },
    icon : {
        type : String
    },
    slug : {
        type : String,
    },
    status : {
        type : Boolean,
        default : 1,
    }

})

const categoryModel = mongoose.model('category',categorySchema);
module.exports = categoryModel;