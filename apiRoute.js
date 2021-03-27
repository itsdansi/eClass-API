const router = require("express").Router();

// Routes
const categoryRoute = require('./modules/category/categoryRoute');
const userRoute = require('./modules/user/userRoute');
const userDetailRoute = require('./modules/user/userDetailRoute');
const lessonRoute = require('./modules/lesson/lessonRoute');
const courseRoute = require('./modules/course/courseRoute');



router.use('/category',categoryRoute);
router.use('/user',userRoute);
router.use('/userDetails',userDetailRoute);
router.use('/lesson',lessonRoute);
router.use('/course',courseRoute);




module.exports = router;