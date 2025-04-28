const express = require('express');
const router = express.Router();
const { uploadImage, getAllMedia, deleteMedia } = require('../controllers/media.controller');
const multer = require('multer');

// Use memory storage instead of disk storage to avoid storing files on the server
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  } 
});

// Media routes
router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllMedia);
router.delete('/:id', deleteMedia);

module.exports = router;