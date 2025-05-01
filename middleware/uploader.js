const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, "pdfs/");
    } else {
      cb(null, "images/");
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const supportedFormats = /png|jpg|jpeg|pdf/;
    const extension = path.extname(file.originalname).toLowerCase();

    if (supportedFormats.test(extension)) {
      cb(null, true);
    } else {
      cb(new Error("File format must be jpg, jpeg, png, or pdf"));
    }
  },
  limits: {
    fileSize: 10000000, // 10 MB
  },
});

module.exports = uploader;
