const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userDetailModel = require("./userDetailModel");
const mapToModule = require("../../helper/mapToModule");
const upload = require("../../middleware/imageUploader");

// router for getting userDetails
router.get("/", async (req, res) => {
  const userDetail = await userDetailModel
    .find()
    .populate("user", "email status");

  if (!userDetail) {
    res.status(500).json({
      success: false,
    });
  } else res.status(200).send(userDetail);
});

// router for saving userDetails
router.post("/", upload.single("image"), async (req, res, next) => {
  if (req.fileError) {
    return next({
      msg: req.fileError,
      status: 400,
    });
  }

  if (req.file) {
    req.body.image = req.file.filename;
  }

  const checkuser = await userDetailModel.findOne({ user: req.body.user });
  if (checkuser) {
    mapToModule.mapToUserDetail(checkuser, req.body);
    checkuser
      .save()
      .then((createdUserDetail) => {
        res.status(201).json(createdUserDetail);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err,
        });
      });
  } else {
    const user = new userDetailModel({
      user: req.body.user,
      name: req.body.name,
      image: req.body.image,
      address: req.body.address,
      phone: req.body.phone,
    });

    user
      .save()
      .then((createdUserDetail) => {
        res.status(201).json(createdUserDetail);
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          error: err,
        });
      });
  }
});

// router.put("/:id", async (req, res) => {
//   // if (!mongoose.isValidObjectId(req.params.id)){
//   //     res.status(500).send("Invalid category id")
//   // }
//   // else{
//   const user = await userDetailModel.findById(req.params.id);

//   mapToModule.mapToUserDetail(user, req.body);

//   if (!user) {
//     res.status(500).json({
//       success: false,
//       message: `No user found with id : ${req.params.id}`,
//     });
//   }
//   res.status(200).send(user);
//   // }
// });

router.delete("/:id", (req, res) => {
  userDetailModel
    .findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ message: "User is deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, error: err });
    });
});

router.get("/:id", async (req, res) => {
  const user = await userDetailModel
    .findById(req.params.id)
    .populate("user")
    .select("-password");
  if (!user) {
    res.status(500).json({
      success: false,
      message: `No user found with id : ${req.params.id}`,
    });
  }
  res.status(200).send(user);
});

module.exports = router;
