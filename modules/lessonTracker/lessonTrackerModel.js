const mongoose = require("mongoose");
const lessonTrackerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "section",
      required: true,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lesson",
      required: true,
    },

    status: {
      type: Boolean,
      defalt: 1,
    },
  },
  {
    timestamps: true,
  }
);

const lessonTrackerModel = mongoose.model("lessonTracker", lessonTrackerSchema);
module.exports = lessonTrackerModel;
