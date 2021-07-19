const mongoose = require("mongoose");
const favoriteSchema = mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
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

const favoriteModel = mongoose.model("favorite", favoriteSchema);
module.exports = favoriteModel;
