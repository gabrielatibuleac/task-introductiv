
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

// Get a specific comment by ID
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new comment
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

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        
        await comment.deleteOne();
        res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;