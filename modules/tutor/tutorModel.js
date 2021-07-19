const mongoose = require("mongoose");
const tutorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const tutorModel = mongoose.model("tutor", tutorSchema);
module.exports = tutorModel;
