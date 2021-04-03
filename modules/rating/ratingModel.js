const mongoose = require('mongoose');
const ratingSchema = mongoose.Schema({
    rating : {
        type : Number,
        required : true,
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'user',
        required : true,
    },
    course : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'course',
        required : true,
    },
    comment : {
        type : String,
    },
    status : {
        type : Boolean,
        default : 1
    }
},
{
    timestamps: true,
  })

const ratingModel = mongoose.model('rating',ratingSchema);
module.exports = ratingModel;
