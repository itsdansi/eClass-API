const express = require("express");
const router = express.Router();
const tutorModel = require("./tutorModel");
const helper = require("../../helper/isValid");

// Router & controller save tutor data
router.post("/", (req, res) => {
  const tutor = new tutorModel({
    email: req.body.email,
    password: req.body.password,
    // course: req.body.course,
    status: req.body.status,
  });

  tutor
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

// Router & controller to get all tutor data
router.get("/", async (req, res) => {
  const tutor = await tutorModel.find();
  if (!tutor) {
    res.status(500).json({ message: "No tutor found !" });
  } else res.status(200).json(tutor);
});

// Router & controller to delete an tutor
router.delete("/:id", (req, res) => {
  tutorModel
    .findByIdAndRemove(req.params.id)
    .then((tutor) => {
      if (tutor) {
        return res
          .status(200)
          .json({ message: "tutor is deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "tutor not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, error: err });
    });
});

// Router & controller to get a tutor data by Id
router.get("/:id", async (req, res) => {
  if (!helper.isValidId(req.params.id)) throw "Invalid tutor id:" + ` ${id}`;
  const tutor = await tutorModel.findById(req.params.id);
  if (!tutor) {
    res.status(500).json({
      success: false,
      message: "No tutor found with that id",
    });
  } else res.status(200).send(tutor);
});

// Router & controller to get a tutor data by emailId
router.get("/:id", async (req, res) => {
  const tutor = await tutorModel.findOne({ email: email });
  if (!tutor) throw "Tutor with" + ` ${email} ` + "not found";
  else res.status(200).send(tutor);
});

// Router & controller to count total tutor
router.get("/get/count", async (req, res) => {
  const tutorCount = await tutorModel.countDocuments((count) => count);
  if (!tutorCount) {
    res.status(500).json({
      success: false,
    });
  } else res.send({ tutorCount: tutorCount });
});

module.exports = router;
