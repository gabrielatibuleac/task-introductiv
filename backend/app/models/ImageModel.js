const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Image title is required'] 
  },
  imageUrl: { 
    type: String, 
    required: [true, 'Image URL is required'] 
  },
  collection: { 
    type: String, 
    required: [true, 'Collection name is required'] 
  },
  description: { 
    type: String,
    default: ''
  },
  order: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Image', ImageSchema);