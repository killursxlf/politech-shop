const multer = require('multer');
const path = require('path');
const fs = require('fs');

const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tmpPath = path.join(__dirname, '../temp');
    if (!fs.existsSync(tmpPath)) fs.mkdirSync(tmpPath, { recursive: true });
    cb(null, tmpPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: tempStorage });

module.exports = upload;
