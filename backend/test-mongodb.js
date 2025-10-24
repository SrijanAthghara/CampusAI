const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

console.log('🔍 Testing MongoDB Connection...\n');

// Get MongoDB URI from environment
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/campus-suggestion-box';
console.log(`📡 Connecting to: ${mongoUri.replace(/\/\/.*:.*@/, '//***:***@')}`);

// Test connection
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ SUCCESS: Connected to MongoDB!');
  console.log(`📊 Database: ${mongoose.connection.name}`);
  console.log(`🏠 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
  
  // Test creating a document
  const testSchema = new mongoose.Schema({ test: String });
  const TestModel = mongoose.model('Test', testSchema);
  
  return TestModel.create({ test: 'Database is working!' });
})
.then((doc) => {
  console.log('✅ SUCCESS: Can write to database!');
  console.log(`📝 Test document created: ${doc._id}`);
  
  // Clean up test document
  return mongoose.model('Test').deleteOne({ _id: doc._id });
})
.then(() => {
  console.log('✅ SUCCESS: Can delete from database!');
  console.log('\n🎉 Your MongoDB is fully functional!');
  console.log('\n📋 What happens when you submit feedback:');
  console.log('   1. Form data sent to backend');
  console.log('   2. OpenAI categorizes the feedback');
  console.log('   3. Data saved to "feedbacks" collection');
  console.log('   4. Admin can view in dashboard');
  
  process.exit(0);
})
.catch((error) => {
  console.error('❌ ERROR: MongoDB connection failed!');
  console.error(`💡 Details: ${error.message}`);
  
  if (error.message.includes('ECONNREFUSED')) {
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Is MongoDB service running?');
    console.log('   2. Check if port 27017 is available');
    console.log('   3. Try restarting MongoDB service');
  } else if (error.message.includes('authentication')) {
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Check username/password in connection string');
    console.log('   2. Verify database user permissions');
  }
  
  process.exit(1);
});