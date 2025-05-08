const express = require('express');
const router = express.Router();

const Item = require('../models/CommentModels.js');

// GET toate item-urile
router.get('/:id', async (req, res) => {
    const items = await Item.find();
    res.json("Hello World");
});

// POST un item nou
router.post('/', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    const savedItem = await newItem.save();
    res.json(savedItem);
});

module.exports = router;
