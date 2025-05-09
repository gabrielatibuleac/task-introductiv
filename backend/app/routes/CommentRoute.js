const express = require('express');
const router = express.Router();
const Comment = require('../models/CommentModels.js');

router.get('/item/:itemId', async (req, res) => {
    try {
        const comments = await Comment.find({ itemId: req.params.itemId })
                                    .sort({ createdAt: -1 }); 
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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