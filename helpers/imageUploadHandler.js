const multer = require("multer");

//Configura multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/imgs");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

module.exports = {
    storage : storage,
    upload : multer({ storage: storage })
};