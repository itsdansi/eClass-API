const router = require("express").Router();

// Routes
const categoryRoute = require('./modules/category/categoryRoute');
const userRoute = require('./modules/user/userRoute');
const userDetailRoute = require('./modules/user/userDetailRoute');
const lessonRoute = require('./modules/lesson/lessonRoute');
const courseRoute = require('./modules/course/courseRoute');
const questionRoute = require('./modules/question/questionRoute');
const answerRoute = require('./modules/answer/answerRoute');




router.use('/category',categoryRoute);
router.use('/user',userRoute);
router.use('/userDetails',userDetailRoute);
router.use('/lesson',lessonRoute);
router.use('/course',courseRoute);
router.use('/question',questionRoute);
router.use('/answer', answerRoute);



module.exports = router;