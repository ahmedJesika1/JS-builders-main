const multer = require('multer');

const storage = multer.memoryStorage();

module.exports.upload = multer({
  storage,
  limits: {
    fileSize: 102400000,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'image/svg+xml' ||
      file.mimetype === 'image/svg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/avif' ||
      file.mimetype?.includes('video')
    ) {
      cb(null, true);
    } else {
      cb(new Error('only .jpg, .png, .jpeg or .webp format allowed'));
    }
  },
});
