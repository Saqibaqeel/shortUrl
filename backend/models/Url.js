const mongoose = require('mongoose');
const shortid = require('shortid');
const Url = require('../models/Url'); // adjust path as needed

// Controller: generateShortUrl
const generateShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: 'Original URL is required' });
  }

  try {
    const existingUrl = await Url.findOne({ originalUrl });
    if (existingUrl) {
      return res.status(200).json({ shortUrl: existingUrl.shortUrl });
    }

    const shortUrl = shortid.generate();
    const shortUrlEntry = new Url({
      shortUrl,
      originalUrl,
      stats: [{ timestamp: Date.now() }],
    });

    await shortUrlEntry.save();
    res.status(201).json({ shortUrl });
  } catch (error) {
    console.error('Error generating short URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { generateShortUrl };


// Mongoose model (models/Url.js)
const urlSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    stats: [
      {
        timestamp: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Url', urlSchema);
