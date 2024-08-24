const fs = require("fs");

const deleteFile = (filePath, callback) => {
  fs.unlink(filePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error(`Failed to delete file at ${filePath}: ${err.message}`);
      return callback(err);
    }
    callback(null);
  });
};

module.exports = deleteFile;
