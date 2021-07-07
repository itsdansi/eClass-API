const mongoose = require("mongoose");
const config = require("./config.json");

// const conxn = `config.${DATABASE.DB_URL} / config.${DATABASE.DB_NAME}`;
const conxn = config.url + "/" + config.dbname;

//for dev and local database server
// mongoose.connect(
//   conxn,
//   {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   },
//   function (err, done) {
//     if (err) {
//       console.log("Error connecting to db >>" + err);
//     } else {
//       console.log("db connection successs");
//     }
//   }
// );

//for remote
mongoose.connect(
  "mongodb+srv://debid:D4v!d123@cluster0.bumti.mongodb.net/eclass?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, done) {
    if (err) {
      console.log("Error connecting to db >>" + err);
    } else {
      console.log("db connection success");
    }
  }
);
