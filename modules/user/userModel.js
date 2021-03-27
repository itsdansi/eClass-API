const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status:{
        type:Number,
        default:0
    }
},{
    timestamps: true,
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;