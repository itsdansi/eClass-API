const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const favoriteModel = require("./favoriteModel");
// const mapToModule = require("../../helper/mapToModule");

// Router & controller create a fovorite
router.post("/", (req, res) => {
  const fovorite = new favoriteModel({
    user: req.body.user,
    course: req.body.course,
    status: req.body.status,
  });

  fovorite
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
});

// Router to get all fovorites
router.get("/", async (req, res) => {
  const fovorite = await favoriteModel
    .find()
    .populate("course", "title")
    .populate("user", "email");
  if (!fovorite) {
    res.status(500).json({ message: "No fovorite found !" });
  } else res.status(200).json(fovorite);
});

// Router to update a fovorite data by Id
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(500).send("Invalid fovorite id");
  } else {
    //   mapToModule.mapTofovorite(fovorite, req.body);

    const updatedFovorite = await favoriteModel.findByIdAndUpdate(
      req.params.id,
      {
        user: req.body.user,
        course: req.body.course,
        status: req.body.status,
      },
      { new: true }
    );
    if (!updatedFovorite) {
      res.status(500).json({
        success: false,
        message: `No favorite found with id : ${req.params.id}`,
      });
    }
    res.status(200).send(updatedFovorite);
  }
});

//  Router to delete a fovorite by Id
router.delete("/:id", async (req, res) => {
  const fovorite = await favoriteModel.findByIdAndDelete(req.params.id);
  if (fovorite) {
    return res.status(200).json({ message: "fovorite  deleted successfully" });
  } else
    return res
      .status(404)
      .json({ success: false, message: "fovorite not found" });
});

// Router to get a fovorite data by Id
router.get("/:id", async (req, res) => {
  const fovorite = await favoriteModel
    .findById(req.params.id)
    .populate("course", "title")
    .populate("user", "email");
  if (!fovorite) {
    res.status(500).json({
      success: false,
      message: "No fovorite found with that id",
    });
  } else res.status(200).send(fovorite);
});

// Router & controller to get all fovorite course by a single user
router.get("/user/:uid", async (req, res) => {
  // console.log(req.params);
  const fovorite = await favoriteModel
    .find({ user: req.params.uid })
    .populate("course", "title")
    .populate("user", "email");

  if (!fovorite) {
    res.status(500).json({
      success: false,
      message: "No fovorite by that user id found!",
    });
  } else res.send(fovorite);
});

module.exports = router;
