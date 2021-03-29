const mongoose = require('mongoose');

const enrollSchema = mongoose.Schema({

    course : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'course',
        required : true,
    },
    expireDate :
    {
        type : Date,
        expires : '1d'
    },
    status : {
        type : Boolean,
        default : 1
    }
})

const enrollModel = mongoose.model('enroll',enrollSchema);
module.exports = enrollModel;
