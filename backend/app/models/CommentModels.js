const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    userId:{
        type: Number,
        required: [true, 'Adauga id-ul utilizatorului']
    },
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
        default: 'Anonim',
        maxlength: [50, 'Numele utilizatorului nu poate depasi 50 de caractere'],
        minlength: [3, 'Numele utilizatorului trebuie sa aiba minim 3 caractere'],
        required: [true, 'Adauga numele utilizatorului']
    }
});

module.exports = mongoose.model('Comment', CommentSchema);