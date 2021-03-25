const express = require('express');
const app = express();
const config = require("./config.json");




//Server connection
app.listen(config.PORT, () => {
    console.log(`Server is running at port : ${config.PORT}`);
  });

