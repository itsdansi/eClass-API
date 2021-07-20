const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { getVideoDurationInSeconds } = require("get-video-duration");
const lessonTrackerModel = require("./../lessonTracker/lessonTrackerModel");

// Router & controller to get all lessonTracker data
router.get("/", async (req, res) => {
  const lessonTracker = await lessonTrackerModel.find();
  if (!lessonTracker) {
    res.status(500).json({ success: false, message: "No lesson found !" });
  } else res.status(200).json(lessonTracker);
});

// Router & controller save lessonTracker data
router.post("/", (req, res, next) => {
  const lessonTracker = new lessonTrackerModel({
    user: req.body.user,
    course: req.body.course,
    section: req.body.section,
    lesson: req.body.lesson,
    status: req.body.status,
    //    result: req.body
  });

  lessonTracker
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

// Router & controller to update a lessonTracker data
router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(500).send("Invalid lesson tracker id");
  } else {
    const lessonTracker = await lessonTrackerModel.findByIdAndUpdate(
      req.params.id,
      {
        user: req.body.user,
        course: req.body.course,
        section: req.body.section,
        lesson: req.body.lesson,
        status: req.body.status,
      },
      { new: true }
    );
    if (!lessonTracker) {
      res.status(500).json({
        success: false,
        message: `No lesson found with id : ${req.params.id}`,
      });
    }
    res.status(200).send(lessonTracker);
  }
});

// Router & controller to delete a lesson
router.delete("/:id", (req, res) => {
  lessonTrackerModel
    .findByIdAndRemove(req.params.id)
    .then((lessonTracker) => {
      if (lessonTracker) {
        return res
          .status(200)
          .json({ message: "Lesson is deleted successfully" });
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

// Router & controller to get a lessonTracker data by Id
router.get("/:id", async (req, res) => {
  const lessonTracker = await lessonTrackerModel.findById(req.params.id);
  if (!lessonTracker) {
    res.status(500).json({
      success: false,
      message: "No lessonTracker found with that id",
    });
  } else res.status(200).send(lessonTracker);
});

// Router & controller to count total lessonTrackers
router.get("/get/count", async (req, res) => {
  const lessonTrackerCount = await lessonTrackerModel.countDocuments(
    (count) => count
  );
  if (!lessonTrackerCount) {
    res.status(500).json({
      success: false,
    });
  } else res.send({ lessonTrackerCount: lessonTrackerCount });
});

// // Router & controller to get all lessonTracker in a single section
// router.get("/section/:sid", async (req, res) => {
//   // console.log(req.params);
//   const lessonTracker = await lessonTrackerModel.find({ section: req.params.sid });

//   if (!lessonTracker) {
//     res.status(500).json({
//       success: false,
//       message: "No lessonTracker found with that section id",
//     });
//   } else res.send(lessonTracker);
// });

// Router & controller to get all lessonTracker in a single section
router.get("/user/:uid", async (req, res) => {
  const lessonTracker = await lessonTrackerModel.find({ user: req.params.uid });

  if (!lessonTracker) {
    res.status(500).json({
      success: false,
      message: "No lessonTracker found with that section id",
    });
  } else res.send(lessonTracker);
});

// // Router & controller to count all lesson in a single section
// router.get("/count/course/:cid", async (req, res) => {
//   // console.log(req.params);
//   const lessonCount = await lessonModel
//     .find({ course: req.params.cid })
//     .countDocuments((count) => count);

//   if (!lessonCount) {
//     res.status(500).json({
//       success: false,
//       message: "No lesson found with that course id",
//     });
//   } else res.status(200).json({ countLessonByCourseId: lessonCount });
// });

module.exports = router;
