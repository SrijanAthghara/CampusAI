# 🚀 Quick Setup Guide

## ✅ What's Done
- ✅ Complete MERN stack application created
- ✅ All dependencies installed 
- ✅ Project structure set up
- ✅ Environment files created

## 🔧 Next Steps (Required before running)

### 1. Configure Environment Variables

**Backend (`backend/.env`)**:
```bash
# Add your OpenAI API key here:
OPENAI_API_KEY=sk-your-actual-openai-api-key

# MongoDB (default is fine for local development):
MONGODB_URI=mongodb://localhost:27017/campus-suggestion-box
```

**Frontend (`frontend/.env`)** - Already configured for local development.

### 2. Get OpenAI API Key
1. Visit: https://platform.openai.com/
2. Sign up/Login → API Keys → Create new key
3. Copy the key to `backend/.env`

### 3. Install & Start MongoDB
**Option A: Local MongoDB**
1. Download from: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service

**Option B: MongoDB Atlas (Cloud)**
1. Visit: https://www.mongodb.com/atlas
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

## 🚀 Start the Application

```bash
# Navigate to project root
cd C:\Users\srija\Downloads\CampAI

# Start both frontend and backend
npm run dev
```

This will open:
- **Frontend**: http://localhost:3000 (Student feedback form)
- **Backend**: http://localhost:5000 (API server)
- **Admin**: http://localhost:3000/admin (Admin dashboard)
- **QR Code**: http://localhost:3000/qrcode (QR code generator)

## 🎯 Test the Application

1. **Submit Feedback**: Go to http://localhost:3000
   - Fill form with department and feedback
   - AI will categorize it automatically

2. **View Admin Dashboard**: Go to http://localhost:3000/admin
   - See all feedback with categories
   - Filter by category

3. **Generate QR Code**: Go to http://localhost:3000/qrcode
   - Download QR code for easy sharing

## 📱 Features Included

- ✅ Student feedback form with validation
- ✅ AI-powered categorization (Canteen, Hostel, Academics, etc.)
- ✅ Admin dashboard with statistics
- ✅ QR code generation for mobile access
- ✅ Responsive design for all devices
- ✅ Real-time feedback submission
- ✅ Category filtering and statistics

## 🆘 Troubleshooting

**If you get errors:**
1. Ensure MongoDB is running
2. Check OpenAI API key is valid
3. Verify ports 3000 and 5000 are available
4. Check console for specific error messages

**Common Issues:**
- MongoDB connection error → Start MongoDB service
- OpenAI API error → Check API key and credits
- Port conflicts → Change ports in package.json scripts

Need help? Check the full README.md for detailed instructions!