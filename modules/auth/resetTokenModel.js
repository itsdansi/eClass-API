const mongoose = require("mongoose");
const resetTokenSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    token: {
      type: Number,
      required: true,
    },
    expires: Date,
    createdByIp: String,
  },
  {
    timestamps: true,
  }
);

const resetTokenModel = mongoose.model("resetToken", resetTokenSchema);
module.exports = resetTokenModel;
