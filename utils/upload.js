const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/assets/img/products/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const limits = {
  fileSize: 1024 * 1024 * 5
};

const fileFilter = (req, file, cb) => {
  cb(null, file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png');
};

module.exports = multer({
  storage,
  limits,
  fileFilter
});
