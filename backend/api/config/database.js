const mongoose = require('mongoose');
const config = require('./config.json');

const connectDB = async () => {
  try {
    const mongoURI = `mongodb://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port || 27017}/${config.development.database}`;
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: 'admin'
    });
    
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;