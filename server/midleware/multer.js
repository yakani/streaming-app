const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
    'video/mp4', 'video/quicktime', 'video/x-msvideo'
  ];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images (JPEG, JPG, PNG, GIF) and videos (MP4, MOV, AVI) are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 1024 * 2 // 3GB limit
  }
}).fields([
  { name: 'file', maxCount: 1 },
  { name: 'Tittle', maxCount: 1 },
  { name: 'subtittle', maxCount: 1 },
  { name: 'Description', maxCount: 1 },
  { name: 'category', maxCount: 1 },
  { name: 'season', maxCount: 1 },
  { name: 'serie', maxCount: 1 },

]);

module.exports = upload;