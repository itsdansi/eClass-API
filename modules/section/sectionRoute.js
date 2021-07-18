const express = require("express");
const router = express.Router();

const sectionModel = require("./sectionModel");
const mapToModule = require("../../helper/mapToModule");

// Router & controller create a section
router.post("/", (req, res) => {
  const section = new sectionModel({
    title: req.body.title,
    lesson: req.body.lesson,
    lessonCompleted: req.body.lessonCompleted,
    lessonStartsAt: req.body.lessonStartsAt,
    lessonEndsAt: req.body.lessonEndsAt,
    course: req.body.course,
    duration: req.body.duration,
    status: req.body.status,
  });

  section
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

// Router to get all sections
router.get("/", async (req, res) => {
  const section = await sectionModel.find();
  if (!section) {
    res.status(500).json({ success: false, message: "No section found !" });
  } else res.status(200).json(section);
});

// Router to update a section data by Id
router.put("/:id", async (req, res) => {
  // if (!mongoose.isValidObjectId(req.params.id)){
  //     res.status(500).send("Invalid section id")
  // }
  // else{
  const section = await sectionModel.findById(req.params.id);

  mapToModule.mapToSection(section, req.body);

  const updatedSection = await section.save();
  if (!section) {
    res.status(500).json({
      success: false,
      message: `No section found with id : ${req.params.id}`,
    });
  }
  res.status(200).send(updatedSection);
});

//  Router to delete a section by Id
router.delete("/:id", async (req, res) => {
  const section = await sectionModel.findByIdAndDelete(req.params.id);
  if (section) {
    return res
      .status(200)
      .json({ success: true, message: "Section  deleted successfully" });
  } else
    return res
      .status(404)
      .json({ success: false, message: "Section not found" });
});

// Router to get a section data by Id
router.get("/:id", async (req, res) => {
  const section = await sectionModel.findById(req.params.id);
  if (!section) {
    res.status(500).json({
      success: false,
      message: "No section found with that id",
    });
  } else res.status(200).send(section);
});

// Router to get a section data by Id
router.get("/get/count", async (req, res) => {
  const sectionCount = await sectionModel.countDocuments((count) => count);
  if (!sectionCount) {
    res.status(500).json({
      success: false,
    });
  } else res.send({ sectionCount: sectionCount });
});

module.exports = router;
