const mongoose = require('mongoose');

// MongoDB URI - Replace this with your own database URI
const mongoURI = 'mongodb://localhost:27017/plumbing-daddy';

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;