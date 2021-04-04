const path = require("path");
const multer = require("multer");

function filter(req, file, cb) {
  const mimetype = file.mimetype.split("/")[0];
  if (mimetype == "image") {
    cb(null, true);
  } else {
    req.fileError = "Invalid file format";
    cb(null, false);
  }
}
const diskStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, Date.now() + "-" + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads/images"));
  },
});

const imageUpload = multer({
  storage: diskStorage,
  fileFilter: filter,
});

module.exports = imageUpload;
