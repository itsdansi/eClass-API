const mongoose = require('mongoose');
const sliderSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    desc : {
        type : String,
    },
    imageUrl: {
        type : String,
        required : true,
    },
    status : {
        type : Boolean,
        default : 1,
    }
},
{
    timestamps: true,
  })

const sliderModel = mongoose.model('slider', sliderSchema);
module.exports = sliderModel;