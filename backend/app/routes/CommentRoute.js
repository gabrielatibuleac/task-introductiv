
const express = require('express');
const router = express.Router();
const Comment = require('../models/CommentModels.js');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get comments for a specific item
router.get('/item/:itemId', async (req, res) => {
    try {
        const comments = await Comment.find({ itemId: req.params.itemId })
                                    .sort({ createdAt: -1 }); 
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const { content, userId, userName, itemId } = req.body;
        
        if (!content || !userId || !userName || !itemId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newComment = new Comment({
            content,
            userId,
            userName,
            itemId  
        });

        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;