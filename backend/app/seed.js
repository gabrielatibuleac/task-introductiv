const mongoose = require('mongoose');
const Image = require('./models/ImageModel');
mongoose.connect('mongodb+srv://admin:admin@cluster0.sd3rncw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function seedDatabase() {
  try {
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.disconnect();
  }
}

seedDatabase();