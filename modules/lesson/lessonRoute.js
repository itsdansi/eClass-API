const express = require("express");
const router = express.Router();
const { getVideoDurationInSeconds } = require("get-video-duration");
const lessonModel = require("./lessonModel");
const videoUpload = require("../../middleware/videoUploader");

// Router & controller to get all lesson data
router.get("/", async (req, res) => {
  const lesson = await lessonModel
    .find()
    // .populate("course", "title thumbnail")
    .populate("section", "_id:0 title");
  if (!lesson) {
    res.status(500).json({ success: false, message: "No lesson found !" });
  } else res.status(200).json(lesson);
});

// Router & controller save lesson data
router.post("/", videoUpload.single("videoUrl"), (req, res, next) => {
  //  console.log()
  //  getVideoDurationInSeconds(process.cwd()+"/uploads/videos/"+req.file.filename).then((duration) => {
  //     console.log(duration/60)
  //   })

  if (req.fileError) {
    return next({
      msg: req.fileError,
      status: 400,
    });
  }

  if (req.file) {
    req.body.videoUrl = req.file.filename;
  }
  const lesson = new lessonModel({
    title: req.body.title,
    duration: req.body.duration,
    course: req.body.course,
    section: req.body.section,
    videoUrl: req.body.videoUrl,
    lessonType: req.body.lessonType,
    status: req.body.status,
    //    result: req.body
  });

  lesson
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

// Router & controller to update a lesson data
router.put("/:id", async (req, res) => {
  // if (!mongoose.isValidObjectId(req.params.id)){
  //     res.status(500).send("Invalid category id")
  // }
  // else{
  const lesson = await lessonModel.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      duration: req.body.duration,
      course: req.body.course,
      section: req.body.section,
      videoUrl: req.body.videoUrl,
      lessonType: req.body.lessonType,
      status: req.body.status,
    },
    { new: true }
  );
  if (!lesson) {
    res.status(500).json({
      success: false,
      message: `No lesson found with id : ${req.params.id}`,
    });
  }
  res.status(200).send(lesson);
  // }
});

// Router & controller to delete a lesson
router.delete("/:id", (req, res) => {
  lessonModel
    .findByIdAndRemove(req.params.id)
    .then((lesson) => {
      if (lesson) {
        return res
          .status(200)
          .json({ success: true, message: "Lesson is deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Lesson not found" });
      }
    })
    .catch((err) => {
      return res.status(404).json({ success: false, error: err });
    });
});

// Router & controller to get a lesson data by Id
router.get("/:id", async (req, res) => {
  const lesson = await lessonModel
    .findById(req.params.id)
    .populate("course", "title thumbnail")
    .populate("section", "title");
  if (!lesson) {
    res.status(500).json({
      success: false,
      message: "No lesson found with that id",
    });
  } else res.status(200).send(lesson);
});

// Router & controller to count total lessons
router.get("/get/count", async (req, res) => {
  const lessonCount = await lessonModel.countDocuments((count) => count);
  if (!lessonCount) {
    res.status(500).json({
      success: false,
    });
  } else res.send({ lessonCount: lessonCount });
});

// Router & controller to get all lesson in a single section
router.get("/section/:sid", async (req, res) => {
  // console.log(req.params);
  const lesson = await lessonModel.find({ section: req.params.sid });

  if (!lesson) {
    res.status(500).json({
      success: false,
      message: "No lesson found with that section id",
    });
  } else res.send(lesson);
});

// Router & controller to count all lesson in a single section
router.get("/count/section/:sid", async (req, res) => {
  // console.log(req.params);
  const lessonCount = await lessonModel
    .find({ section: req.params.sid })
    .countDocuments((count) => count);

  if (!lessonCount) {
    res.status(500).json({
      success: false,
      message: "No lesson found with that section id",
    });
  } else res.status(200).json({ lessonCount: lessonCount });
});

module.exports = router;
