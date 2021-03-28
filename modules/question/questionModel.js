const mongoose = require('mongoose');
const questionSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    user : {
        type :  mongoose.SchemaTypes.ObjectId,
        ref :'user',
        required: true,

    },
    course : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'course',
        required: true,

    },
    status : {
        type : Boolean,
        default : 1
    }
})

const questionModel = mongoose.model('question', questionSchema);
module.exports = questionModel;