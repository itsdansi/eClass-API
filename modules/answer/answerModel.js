const mongoose = require('mongoose');
const answerSchema = mongoose.Schema({

    question : {
        type : 'question',
        ref : mongoose.SchemaTypes.ObjectId
    },
    course : {
        type : 'course',
        ref : mongoose.SchemaType.ObjectId,
    },
    title : {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        default : 1
    }
})

const answerModel = mongoose.model('answer',answerSchema);
module.exports = answerModel;