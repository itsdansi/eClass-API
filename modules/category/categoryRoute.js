const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const categoryModel = require("./categoryModel");

// router/controller to get all catagory data
router.get("/", async (req, res) => {
  // let filter = {};
  // if(req.query.categories){
  //     filter = {categories : req.query.categories.spilit(',')}
  // }

  const category = await categoryModel.find();
  if (!category) {
    res.status(500).json({
      success: false,
      message: "Category not found !",
    });
  } else res.send(category);
});

// router/controller to save catagory data
router.post("/", (req, res) => {
  const category = new categoryModel({
    title: req.body.title,
    icon: req.body.icon,
    slug: req.body.slug,
    //    status:req.body.status
  });

  category
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

// router/controller to count total catagory
router.get("/get/count", async (req, res) => {
  const categoryCount = await categoryModel.countDocuments((count) => count);
  if (!categoryCount) {
    res.status(500).json({
      success: false,
    });
  } else res.send({ categoryCount: categoryCount });
});

// router/controller to get a category by ID
router.get("/:id", async (req, res) => {
  const category = await categoryModel.findById(req.params.id);
  if (!category) {
    res.status(500).json({
      success: false,
      message: "No product found with that id",
    });
  } else res.status(200).send(category);
});

// router/controller to update catagory data
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(500).send("Invalid category id");
  } else {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        icon: req.body.icon,
        slug: req.body.slug,
        status: req.body.status,
      },
      { new: true }
    );
    if (!category) {
      res.status(500).json({
        success: false,
        message: `No category found with id : ${req.params.id}`,
      });
    }
    res.status(200).send(category);
  }
});

// router/controller to delete catagory data
router.delete("/:id", (req, res) => {
  categoryModel
    .findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "Category is deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Category not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, error: err });
    });
});

module.exports = router;
