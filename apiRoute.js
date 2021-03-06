const router = require("express").Router();

// Routes
const categoryRoute = require("./modules/category/categoryRoute");
const userRoute = require("./modules/user/userRoute");
const userDetailRoute = require("./modules/user/userDetailRoute");
const lessonRoute = require("./modules/lesson/lessonRoute");
const courseRoute = require("./modules/course/courseRoute");
const questionRoute = require("./modules/question/questionRoute");
const answerRoute = require("./modules/answer/answerRoute");
const sliderRoute = require("./modules/slider/sliderRoute");
const ratingRoute = require("./modules/rating/ratingRoute");
const enrollRoute = require("./modules/enroll/enrollRoute");
const sectionRoute = require("./modules/section/sectionRoute");
const tutorRoute = require("./modules/tutor/tutorRoute");
const authRoute = require("./modules/auth/authRoute");

router.use("/category", categoryRoute);
router.use("/user", userRoute);
router.use("/userDetails", userDetailRoute);
router.use("/lesson", lessonRoute);
router.use("/course", courseRoute);
router.use("/question", questionRoute);
router.use("/answer", answerRoute);
router.use("/slider", sliderRoute);
router.use("/rating", ratingRoute);
router.use("/enroll", enrollRoute);
router.use("/section", sectionRoute);
router.use("/tutor", tutorRoute);
router.use("/auth", authRoute);

module.exports = router;
