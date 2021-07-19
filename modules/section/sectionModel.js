const mongoose = require("mongoose");
const sectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // lessonCompleted: {
    //   type: String,
    //   required: true,
    // },
    duration: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    lessonStartsAt: {
      type: String,
    },
    lessonEndsAt: {
      type: String,
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

const sectionModel = mongoose.model("section", sectionSchema);
module.exports = sectionModel;
