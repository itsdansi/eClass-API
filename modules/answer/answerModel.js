const mongoose = require('mongoose');
const answerSchema = mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    question : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'question'
    },
    course : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'course'
    },
  
    status : {
        type : Boolean,
        default : 1
    }
},
{
    timestamps: true,
  })

const answerModel = mongoose.model('answer',answerSchema);
module.exports = answerModel;