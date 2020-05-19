const multer = require('multer')

const storage = multer.memoryStorage();

exports.multipleImageUpload = multer({ storage }).any('images[]');

