const s3 = require('../config/aws');
const multer = require('multer');

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image'); // Upload a single file

exports.uploadImage = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: 'Image upload failed' });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading to S3:', err);
        return res.status(500).json({ error: 'Error uploading image' });
      }

      const imageUrl = data.Location;
      return res.status(200).json({ imageUrl });
    });
  });
};