const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    user : {
        type : 'user',
        ref : mongoose.SchemaType.ObjectId,
    },
    course : {
        type : 'course',
        ref : mongoose.SchemaType.ObjectId
    },
    title : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        default : 1
    }
})

const questionModel = mongoose.model('question', questionSchema);
module.exports = questionModel;