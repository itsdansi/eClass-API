const router = require("express").Router();

// Routes
const categoryRoute = require('./modules/category/categoryRoute');






router.use('/category',categoryRoute);




module.exports = router;