// Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
// const bodyParser = require('body-parser');
const config = require("./config/config.json");
const APIRoute = require("./apiRoute");
require("./config/dbConfig");

// Middleware 
app.use(morgan("tiny")); //for log
//app.use(cors);

// app.use(bodyParser);     

//For reading json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//API Routes
const api = config.API_URL;
app.use(`${api}/`, APIRoute);


//Server connection
app.listen(config.PORT, () => {
    console.log(`Server is running at port : ${config.PORT}`);
  });


//For error handling
app.use(function (err, req, res, next) {
  console.log("Error handling middleware", err);
  res.status(err.status || 400).json({
    message: err.message || err,
    status: err.status || 400,
  });
});
