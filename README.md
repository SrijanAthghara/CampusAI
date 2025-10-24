# 🎓 Campus AI Suggestion Box

A comprehensive MERN stack application that allows students to submit feedback about campus facilities, automatically categorizes the feedback using OpenAI, and provides an admin dashboard to view all submissions.

## 🌟 Features

- **Student Feedback Form**: Easy-to-use form for submitting campus feedback
- **AI-Powered Categorization**: Automatic feedback classification using OpenAI GPT
- **Admin Dashboard**: Comprehensive dashboard for viewing and filtering feedback
- **QR Code Generation**: Easy access to feedback form via QR codes
- **Real-time Statistics**: Live feedback statistics and category breakdowns
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

- **Frontend**: React 18 + CSS3
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI GPT-3.5-turbo
- **QR Code**: qrcode npm package
- **HTTP Client**: Axios

## 📁 Project Structure

```
CampAI/
├── backend/
│   ├── controllers/
│   │   └── feedbackController.js    # Business logic for feedback operations
│   ├── models/
│   │   └── Feedback.js              # MongoDB schema for feedback
│   ├── routes/
│   │   ├── feedback.js              # API routes for feedback
│   │   └── qrcode.js                # API routes for QR code generation
│   ├── server.js                    # Express server configuration
│   ├── package.json                 # Backend dependencies
│   └── .env.example                 # Environment variables template
├── frontend/
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.js     # Student feedback form
│   │   │   ├── AdminDashboard.js   # Admin dashboard
│   │   │   └── QRCodeDisplay.js    # QR code display and download
│   │   ├── App.js                  # Main app component
│   │   ├── App.css                 # Application styles
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   ├── package.json                # Frontend dependencies
│   └── .env.example                # Frontend environment variables
├── .github/
│   └── copilot-instructions.md     # Project documentation
├── package.json                    # Root package.json
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- OpenAI API Key

### 1. Clone the Repository

```bash
git clone <repository-url>
cd CampAI
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all project dependencies (backend + frontend)
npm run install-all
```

### 3. Environment Configuration

#### Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your actual values:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/campus-suggestion-box
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/campus-suggestion-box

# OpenAI API Key (required)
OPENAI_API_KEY=your_openai_api_key_here

# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000
```

### 4. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or log in
3. Go to API Keys section
4. Create a new API key
5. Add it to your `backend/.env` file

### 5. Start the Application

#### Development Mode (Recommended)

```bash
# Start both backend and frontend concurrently
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend React app on `http://localhost:3000`

#### Production Mode

```bash
# Build frontend
npm run build

# Start backend server
npm start
```

## 📱 Usage

### For Students

1. **Access the Form**: Visit `http://localhost:3000` or scan the QR code
2. **Fill Details**: 
   - Name (optional)
   - Department (required)
   - Feedback text (required)
3. **Submit**: Click "Submit Feedback"
4. **Confirmation**: Receive "Thank you" message upon successful submission

### For Administrators

1. **Access Dashboard**: Visit `http://localhost:3000/admin`
2. **View Statistics**: See total feedback and category breakdowns
3. **Filter Feedback**: Use category filters to view specific types
4. **Review Submissions**: Read detailed feedback with metadata

### QR Code Generation

1. **Access QR Page**: Visit `http://localhost:3000/qrcode`
2. **View QR Code**: See generated QR code for the feedback form
3. **Download**: Click "Download QR Code" for printing/sharing

## 🔧 API Documentation

### Feedback Endpoints

#### Submit Feedback
```http
POST /api/feedback
Content-Type: application/json

{
  "name": "John Doe",           # Optional
  "department": "Computer Science",  # Required
  "feedback": "The canteen food is always cold"  # Required
}
```

**Response:**
```json
{
  "message": "Feedback submitted successfully!",
  "feedback": {
    "_id": "...",
    "name": "John Doe",
    "department": "Computer Science",
    "feedback": "The canteen food is always cold",
    "category": "Canteen",      # AI-generated category
    "date": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Get All Feedback
```http
GET /api/feedback?category=Canteen  # Optional category filter
```

#### Get Feedback Statistics
```http
GET /api/feedback/stats
```

### QR Code Endpoints

#### Generate QR Code
```http
GET /api/qrcode
```

#### Download QR Code
```http
GET /api/qrcode/download
```

## 🤖 AI Categorization

The system uses OpenAI GPT-3.5-turbo to automatically categorize feedback into:

- **🍽️ Canteen**: Food quality, service, menu issues
- **🏠 Hostel**: Accommodation, facilities, maintenance
- **📚 Academics**: Courses, teaching, library, labs
- **🏗️ Infrastructure**: Buildings, roads, utilities
- **⚽ Sports**: Sports facilities, equipment, activities
- **📋 Others**: General suggestions, miscellaneous

### AI Prompt Used:
```
You are a helpful assistant. Categorize this feedback into one of:
[Canteen, Hostel, Academics, Infrastructure, Sports, Others].
Return only the category name.
```

## 🎨 Customization

### Adding New Categories

1. Update the enum in `backend/models/Feedback.js`
2. Add the category to `frontend/src/components/AdminDashboard.js`
3. Update the OpenAI categorization prompt in `backend/controllers/feedbackController.js`

### Styling

- Main styles: `frontend/src/App.css`
- Global styles: `frontend/src/index.css`
- Color scheme: Uses CSS gradients with blue/purple theme

### Database Schema

```javascript
{
  name: String,          // Student name (optional)
  department: String,    // Student department (required)
  feedback: String,      // Feedback text (required)
  category: String,      // AI-generated category
  date: Date            // Submission timestamp
}
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)

1. Build the project: `cd frontend && npm run build`
2. Deploy the `build` folder
3. Update environment variables in deployment settings

### Backend (Heroku/Railway)

1. Set environment variables in platform
2. Deploy the `backend` folder
3. Update MongoDB connection for production

### Environment Variables for Production

```env
# Backend
MONGODB_URI=mongodb+srv://...
OPENAI_API_KEY=sk-...
PORT=5000
FRONTEND_URL=https://your-app.netlify.app

# Frontend
REACT_APP_API_URL=https://your-api.herokuapp.com
```

## 🧪 Testing

### Manual Testing

1. **Feedback Submission**: 
   - Test form validation
   - Submit various feedback types
   - Verify AI categorization

2. **Admin Dashboard**:
   - Check statistics accuracy
   - Test category filtering
   - Verify responsive design

3. **QR Code**:
   - Generate and download QR
   - Test QR code scanning

### Sample Test Data

```bash
# Use these test cases for different categories:

# Canteen feedback
"The food in the canteen is always cold and lacks variety."

# Hostel feedback  
"The Wi-Fi in the hostel is very slow and often disconnects."

# Academic feedback
"We need more practical sessions in the computer lab."

# Infrastructure feedback
"The library AC is not working properly."

# Sports feedback
"The football ground needs better maintenance."
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running locally
   - Check connection string in `.env`
   - For Atlas, verify network access settings

2. **OpenAI API Error**:
   - Verify API key is correct
   - Check API usage limits
   - Ensure sufficient credits

3. **CORS Issues**:
   - Frontend and backend URLs are configured correctly
   - CORS is enabled in Express server

4. **Build Errors**:
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review API documentation
3. Create an issue on GitHub
4. Contact the development team

---

**Built with ❤️ using MERN Stack and OpenAI**