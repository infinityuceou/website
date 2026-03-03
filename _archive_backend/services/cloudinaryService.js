const cloudinary = require('cloudinary').v2;

// configure from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a local file to Cloudinary.
 * @param {string} localPath
 * @param {string} folder - Cloudinary folder path (e.g. "infinity2k26/payments")
 * @returns {Promise<{public_id:string,secure_url:string,resource_type:string}>}
 */
function uploadImage(localPath, folder) {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary credentials are not set in environment');
  }
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      localPath,
      { folder, use_filename: true, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
  });
}

module.exports = { uploadImage };