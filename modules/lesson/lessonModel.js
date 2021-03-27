const mongoose = require('mongoose');
const lessonSchema = mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    duration : {
        type : String,
        required : true,
    },
    // course : {
    //     type : 'course',
    //     ref : mongoose.SchemaTypes.ObjectId,
    //   required: true,
        
    // },
    videoUrl : {
        type : String,
        required : true
    },
    lessonType : {
        type : String,
        required : true
    },
    attachment : {

    },
    summary : {
        type : String,
    },
    status : {
        type : Boolean,
        defalt : 1
    }
    })

    const lessonModel = mongoose.model('lesson',lessonSchema);
    module.exports = lessonModel;
