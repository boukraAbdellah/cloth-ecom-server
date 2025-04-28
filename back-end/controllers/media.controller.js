const Media = require('../models/media.model');
const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

/**
 * Upload an image via Multer (memory) → Cloudinary → MongoDB
 */
async function uploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Create a readable stream from the buffer
    const stream = Readable.from(req.file.buffer);
    
    // Upload stream to cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'clothing-ecommerce' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      
      stream.pipe(uploadStream);
    });
    
    const result = await uploadPromise;
    
    const media = await Media.create({
      url: result.secure_url,
      public_id: result.public_id,
    });
    
    res.json({ media });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image' });
  }
}

/**
 * Get all media assets
 */
async function getAllMedia(req, res) {
  try {
    const mediaList = await Media.find();
    res.json({ media: mediaList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching media' });
  }
}

/**
 * Delete a media asset (Cloudinary + MongoDB)
 */
async function deleteMedia(req, res) {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: 'Media not found' });

    await cloudinary.uploader.destroy(media.public_id);
    await Media.deleteOne({ _id: req.params.id });
    res.json({ message: 'Media deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting media' });
  }
}

module.exports = {
  uploadImage,
  getAllMedia,
  deleteMedia
};