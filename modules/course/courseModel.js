const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    shortDesc: {
      type: String,
    },
    desc: {
      type: String,
    },
    outcome: {
      type: String,
    },
    requirement: {
      type: String,
    },
    courseIncludes: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // hasDiscount : {
    //     type : Boolean,
    //     default : true
    // },
    discount: {
      type: Number,
      default: "0",
    },
    tutor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tutor",
      required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
    thumbnail: {
      type: String,
      // required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      default: 0,
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

const courseModel = mongoose.model("course", courseSchema);
module.exports = courseModel;
