// Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const config = require("./config/config.json");
const APIRoute = require("./apiRoute");
require("./config/dbConfig");


// Middleware 
app.use(morgan("tiny")); //for log

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

