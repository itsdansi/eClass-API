const path = require("path");
const multer = require("multer");

function filter(req, file, cb) {
//console.log(file)
  const mimetype = file.mimetype.split("/")[0];
  if (mimetype == "video") {
    cb(null, true);
  } else {
    req.fileError = "Invalid file format";
    cb(null, false);
  }
}
const diskStorage = multer.diskStorage({
  filename: function (req, file, cb) {
 //  console.log(file);
    cb(null, "VIDEO_" + Date.now()  + path.extname(file.originalname));
  },
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads/videos"));
  },
});

const videoUpload = multer({
  storage: diskStorage,
  fileFilter: filter,
});

module.exports = videoUpload;
