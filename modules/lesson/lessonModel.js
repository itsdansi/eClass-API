const mongoose = require("mongoose");
const lessonSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    section: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "section",
      required: true,
    },
    course: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "course",
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    lessonType: {
      type: String,
      required: true,
    },
    attachment: {},
    summary: {
      type: String,
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

const lessonModel = mongoose.model("lesson", lessonSchema);
module.exports = lessonModel;
