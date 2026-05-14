import multer from "multer";
import path from "path";
import fs from "fs";

export const createUploader = (folderName) => {
  const uploadPath = `upload/${folderName}`;

  fs.mkdirSync(uploadPath, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;

    const ext = allowed.test(path.extname(file.originalname).toLowerCase());

    const mime = allowed.test(file.mimetype);

    if (mime && ext) {
      cb(null, true);
    } else {
      cb(new Error("Only jpeg, jpg, png and webp images are allowed"));
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
  });
};
