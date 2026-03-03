const multer = require('multer');
const path = require('path');
const fs = require('fs');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function storageFor(destFolder) {
    ensureDir(destFolder);
    return multer.diskStorage({
        destination: (req, file, cb) => cb(null, destFolder),
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    });
}

function imageFileFilter(req, file, cb) {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.test(ext)) cb(null, true);
    else cb(new Error('Only image files are allowed'));
}

const limits = { fileSize: 5 * 1024 * 1024 };

module.exports = {
    uploadTo: (folder) => multer({ storage: storageFor(folder), fileFilter: imageFileFilter, limits }),
    imageFileFilter,
    limits
};
