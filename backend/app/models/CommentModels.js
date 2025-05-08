const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    
    content: {
        type: String,
        required: [true, 'Adauga comentariu'],
        maxlength: [1000, 'Nu poate trece de 1000 de caractere']
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    
    userName: {
        type: String,
        required: [true, 'Adauga numele utilizatorului']
    }
});

module.exports = mongoose.model('Comment', CommentSchema);