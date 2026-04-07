import multer from "multer";
import path from "path";

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder name
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

// File filter (only images allowed)
const fileFilter = (req, file, cb) => {
  const allowedTypes =
    /jpeg|jpg|png|pdf/;

  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extname) {
    cb(null, true);
  } else {
    cb("Only images and PDF allowed");
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;