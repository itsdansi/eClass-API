const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    shortDesc:{
        type : String,

    },
    desc : {
        type : String
    },
    outcome : {
        type : String,
    },
    requirement : {
        type : String,
    },
    courseIncludes : {
        type : String,
    },
    category : {
        type : 'course',
        ref : mongoose.SchemaType.ObjectId
    },
    price : {
        type : Number,
        required : true
    },
    hasDiscount : {
        type : Boolean,
        default : true
    },
    discount : {
        type : Number,
        default : "0"
    },
    user : {
        type : 'user',
        ref : mongoose.SchemaType.ObjectId
    },
    thumbnail : {
        type : String,

    },
    videoUrl : {
        type : String,
        required : true
    },
    ifFeatured : {
        type : Boolean,
        default : 0
    },
    status : {
        type : Boolean,
        default : 1
    }
    })

    const courseModel = mongoose.model('course',courseSchema);
    module.exports = courseModel;
