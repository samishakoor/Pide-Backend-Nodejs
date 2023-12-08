const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = (storagePath) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const user = req.user;
      const p = path.join(__dirname, `${storagePath}/${user._id}/`);
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p, { recursive: true });
      }
      cb(null, p);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
};

const maxSize = 1 * 1024 * 1024;
module.exports = (storagePath) => {
  return multer({
    storage: storage(storagePath),
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error("Invalid file format!"), false);
      }
    },
    limits: { fileSize: maxSize },
  });
};
