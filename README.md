# 🎓 Campus AI Suggestion Box

An AI-powered campus feedback system built with the MERN stack. Students can submit anonymous feedback, and administrators can view categorized responses with AI-powered insights.

## ✨ Features

- 📝 **Anonymous Feedback Submission** - Students can submit feedback without registration
- 🤖 **AI Categorization** - Automatic categorization using OpenAI with keyword fallback
- 📊 **Admin Dashboard** - View all feedback with statistics and filtering
- 📱 **QR Code Generator** - Generate QR codes for easy campus access
- 🎨 **Modern UI** - Glassmorphism design with animations
- 📱 **Mobile Responsive** - Works on all devices

## 🚀 Quick Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free)
- OpenAI API key (optional - app works without it)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SrijanAthghara/CampusAI.git
   cd CampusAI
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `backend/.env`:
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   OPENAI_API_KEY=your_openai_api_key_or_fallback_mode
   PORT=8080
   FRONTEND_URL=http://localhost:3000
   ```

   Create `frontend/.env`:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8080
   ```

5. **Run the Application**

   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - Admin Dashboard: http://localhost:3000/admin
   - QR Generator: http://localhost:3000/qr

## 🌐 Deployment

### Free Deployment Options:
- **Frontend**: Vercel, Netlify, or Render
- **Backend**: Render, Railway, or Heroku
- **Database**: MongoDB Atlas (free tier)

### Environment Variables for Production:
- Set `REACT_APP_BACKEND_URL` to your deployed backend URL
- Set `FRONTEND_URL` in backend to your deployed frontend URL
- Use secure MongoDB connection string

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **AI**: OpenAI GPT-3.5-turbo with keyword fallback
- **Deployment**: Render, Vercel, MongoDB Atlas

## 📁 Project Structure

```
CampusAI/
├── backend/
│   ├── controllers/     # API controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # Express routes
│   ├── .env.example    # Environment template
│   ├── package.json    # Backend dependencies
│   └── server.js       # Main server file
├── frontend/
│   ├── public/         # Public assets
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── App.js      # Main app component
│   │   └── App.css     # Styles
│   ├── .env.example    # Environment template
│   └── package.json    # Frontend dependencies
├── .gitignore
└── README.md
```

## 🤖 AI Categorization

The system categorizes feedback into:
- **Academic** - Course content, teaching quality, curriculum
- **Infrastructure** - Buildings, classrooms, facilities
- **Technology** - WiFi, computers, software, online platforms
- **Student Services** - Library, counseling, health services
- **Campus Life** - Events, clubs, dining, accommodation
- **Administration** - Policies, procedures, staff interactions
- **Others** - Miscellaneous feedback

## 📄 License

MIT License - feel free to use this project for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ for campus communities**