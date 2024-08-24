const multer = require("multer");
const path = require("path");

const configureUploadMiddleware = (config) => {
  const {fileFields, destinationPaths, allowedTypes, maxSizes} = config;

  // Configure the Destination
  const destination = (req, file, cb) => {
    console.log({fileField: file.fieldname});

    const uploadPath = destinationPaths[file.fieldname] || "uploads/";
    cb(null, uploadPath);
  };

  // Configure the filename
  const filename = (req, file, cb) => {
    cb(null, file.fieldname.toUpperCase() + "-" + Date.now() + path.extname(file.originalname));
  };

  // Configure multer storage
  const storage = multer.diskStorage({
    destination,
    filename,
  });

  // File filter
  const fileFilter = (req, file, cb) => {
    const field = file.fieldname;
    const allowedType = allowedTypes[field];
    const maxSize = maxSizes[field];

    if (!allowedType.includes(file.mimetype)) {
      return cb(new Error(`Invalid file type for ${field}`), false);
    }

    if (file.size > maxSize) {
      return cb(new Error(`File size exceeds limit for ${field}`), false);
    }

    cb(null, true);
  };

  // Multer upload middleware
  return multer({storage, fileFilter}).fields(fileFields);
};

module.exports = configureUploadMiddleware;
