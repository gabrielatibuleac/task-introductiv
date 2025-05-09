const express = require('express');
const router = express.Router();
const Image = require('../models/ImageModel.js');

router.get('/', async (req, res) => {
  try {
    const images = await Image.find().sort({ order: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/collection/:collection', async (req, res) => {
  try {
    const images = await Image.find({ collection: req.params.collection })
      .sort({ order: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get('/collections/all', async (req, res) => {
  try {
    const collections = await Image.distinct('collection');
    res.json(collections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
  const image = new Image({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    collection: req.body.collection,
    description: req.body.description,
    order: req.body.order
  });

  try {
    const newImage = await image.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an image
router.put('/:id', async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an image
router.delete('/:id', async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    
    res.json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;