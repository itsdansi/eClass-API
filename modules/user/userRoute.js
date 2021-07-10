const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const userModel = require("./userModel");
require("./../auth/authService");

// Router for getting all user list
router.get("/", async (req, res) => {
  const userList = await userModel.find();

  if (!userList) {
    res.status(500).json({
      success: false,
    });
  } else res.send(userList);
});

// Router for registering user
router.post("/", async (req, res) => {
  const user = new userModel({
    email: req.body.email,
    password: req.body.hash,
  });
  // console.log(user)

  user
    .save()
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
});

// Router for finding user by EmailId
router.get("/:email", async (req, res) => {
  const user = await userModel.findOne(req.params.email);
  if (!user) {
    res.status(500).json({
      success: false,
      message: `No user found with id : ${req.params.email}`,
    });
  }
  res.status(200).send(user);
});

// Router for finding user by Id
router.get("/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    res.status(500).json({
      success: false,
      message: `No user found with id : ${req.params.id}`,
    });
  }
  res.status(200).send(user);
});

// Router for updating user by id
router.put("/:id", async (req, res) => {
  // if (!mongoose.isValidObjectId(req.params.id)){
  //     res.status(500).send("Invalid category id")
  // }
  // else{
  const user = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: req.body.password,
    },
    { new: true }
  );
  if (!user) {
    res.status(500).json({
      success: false,
      message: `No user found with id : ${req.params.id}`,
    });
  }
  res.status(200).send(user);
  res.status(200).send(user);
  // }
});

//  Router for deleting user by Id
router.delete("/:id", (req, res) => {
  userModel
    .findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "User is deleted successfully" });
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

module.exports = router;
