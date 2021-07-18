const mongoose = require("mongoose");

const enrollSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    // expireDate :
    // {
    //     type : Date,
    //     expires : '1d'
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    status: {
      type: Boolean,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const enrollModel = mongoose.model("enroll", enrollSchema);
module.exports = enrollModel;
