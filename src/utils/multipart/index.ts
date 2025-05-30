import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure 'public/uploads' exists
const uploadPath = path.resolve("public", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

export const s3Storage = multer.memoryStorage();

export const handleMediaFile = multer({
  storage: s3Storage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter: (req, file, callback) => {
    const FileTypes = /Jpg|jpeg|jpg|png|gif|mp4|mpeg|webp/;
    const isValidFile = FileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (isValidFile) {
      callback(null, true);
    } else {
      callback(new Error("File type not supported") as any, false);
    }
  },
});

export const localStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    try {
      const fileName = file.originalname.split(" ").join("-");
      const extension = path.extname(fileName);
      const baseName = path.basename(fileName, extension);
      callback(null, `${baseName}-${Date.now()}${extension}`);
    } catch (e: any) {
      return callback(new Error(e.message), "");
    }
  },
});

export const handleMediaFilesLocal = multer({
  storage: localStorage,
  limits: {
    fileSize: 1024 * 1024 * 100,
  },
  fileFilter: (req, file, callback) => {
    try {
      const FileTypes = /jpeg|jpg|png|webp|JPG|PNG|JPEG/;
      const mimType = FileTypes.test(file.mimetype);
      const extname = FileTypes.test(path.extname(file.originalname).toLowerCase());
      if (mimType && extname) {
        return callback(null, true);
      }
      return callback(new Error("File type not supported") as any, false);
    } catch (error: any) {
      return callback(new Error(error.message) as any, false);
    }
  },
});
