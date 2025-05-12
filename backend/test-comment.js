const mongoose = require('mongoose');
const Comment = require('./app/models/CommentModels.js');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.sd3rncw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log("Connected to MongoDB for testing"))
  .catch(err => console.error("Connection error:", err));

// Test function to add a comment
async function addTestComment() {
  try {
    const testComment = new Comment({
      userId: 12345,
      userName: "Test User",
      content: "This is a test comment created at " + new Date().toISOString(),
      itemId: "n1" // Use a mentor ID
    });
    
    const savedComment = await testComment.save();
    console.log("Comment saved successfully:", savedComment);
    return savedComment;
  } catch (err) {
    console.error("Error saving comment:", err.message);
    return null;
  }
}

// Test function to fetch all comments
async function getAllComments() {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    console.log(`Found ${comments.length} comments:`);
    comments.forEach(comment => {
      console.log(`- ID: ${comment._id}, User: ${comment.userName}, ItemId: ${comment.itemId}`);
    });
    return comments;
  } catch (err) {
    console.error("Error fetching comments:", err.message);
    return [];
  }
}

// Test function to fetch comments for a specific item
async function getCommentsByItemId(itemId) {
  try {
    const comments = await Comment.find({ itemId }).sort({ createdAt: -1 });
    console.log(`Found ${comments.length} comments for item ${itemId}:`);
    comments.forEach(comment => {
      console.log(`- ID: ${comment._id}, User: ${comment.userName}, Content: ${comment.content.substring(0, 30)}...`);
    });
    return comments;
  } catch (err) {
    console.error(`Error fetching comments for item ${itemId}:`, err.message);
    return [];
  }
}

// Run tests
async function runTests() {
  try {
    console.log("=== Testing Comment API ===");
    
    // Test 1: Add a new comment
    console.log("\n1. Adding a test comment...");
    const newComment = await addTestComment();
    
    // Test 2: Fetch all comments
    console.log("\n2. Fetching all comments...");
    await getAllComments();
    
    // Test 3: Fetch comments for an item
    console.log("\n3. Fetching comments for item 'n1'...");
    await getCommentsByItemId("n1");
    
    console.log("\nTests completed.");
  } catch (err) {
    console.error("Test error:", err);
  } finally {
    // Close the MongoDB connection
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

// Run the tests
runTests();