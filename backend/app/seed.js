const mongoose = require('mongoose');
const Image = require('./models/ImageModel');
mongoose.connect('mongodb+srv://admin:admin@cluster0.sd3rncw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

//todo: add seed images
async function seedDatabase() {
  try {
    // Clear existing data
    await Image.deleteMany({});
    console.log('Previous image data cleared');
    
    // Insert new data
    await Image.insertMany(seedImages);
    console.log('Database seeded successfully with images');
    
    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.disconnect();
  }
}

seedDatabase();