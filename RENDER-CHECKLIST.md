# 📋 Render Deployment Checklist

## Before You Start:
- [ ] GitHub repository is up to date ✅
- [ ] MongoDB Atlas cluster is created
- [ ] OpenAI API key is ready

## Deployment Steps:

### 1. MongoDB Atlas Setup:
- [ ] Go to https://cloud.mongodb.com
- [ ] Create free M0 cluster
- [ ] Create database user: `campusadmin`
- [ ] Whitelist IP: `0.0.0.0/0`
- [ ] Copy connection string

### 2. Deploy Backend (Method A - Manual):
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] **New** → **Web Service**
- [ ] Connect CampusAI repository
- [ ] Configure:
  - [ ] Name: `campus-ai-backend`
  - [ ] Root directory: `backend`
  - [ ] Build command: `npm install`
  - [ ] Start command: `npm start`
  - [ ] Instance type: **Free**
- [ ] Add environment variables:
  - [ ] `MONGODB_URI` = your_atlas_connection_string
  - [ ] `OPENAI_API_KEY` = your_openai_api_key
  - [ ] `PORT` = `10000`
  - [ ] `FRONTEND_URL` = `https://campus-ai-frontend.onrender.com`
  - [ ] `NODE_ENV` = `production`
- [ ] Deploy and note backend URL

### 3. Deploy Frontend:
- [ ] **New** → **Static Site**
- [ ] Connect CampusAI repository
- [ ] Configure:
  - [ ] Name: `campus-ai-frontend`
  - [ ] Root directory: `frontend`
  - [ ] Build command: `npm install && npm run build`
  - [ ] Publish directory: `build`
- [ ] Add environment variable:
  - [ ] `REACT_APP_BACKEND_URL` = your_backend_url_from_step_2
- [ ] Deploy and note frontend URL

### 4. Update Backend:
- [ ] Go back to backend service
- [ ] Update `FRONTEND_URL` environment variable with actual frontend URL
- [ ] Save changes (auto-redeploys)

### 5. Test Deployment:
- [ ] Visit frontend URL
- [ ] Submit test feedback
- [ ] Check admin dashboard at `/admin`
- [ ] Generate QR code at `/qr`

## 🔗 Final URLs:
- **Frontend**: https://campus-ai-frontend.onrender.com
- **Backend API**: https://campus-ai-backend.onrender.com
- **Admin Dashboard**: https://campus-ai-frontend.onrender.com/admin
- **QR Code Generator**: https://campus-ai-frontend.onrender.com/qr

## 🚀 Alternative: One-Click Blueprint Deployment (Method B):
- [ ] Go to https://render.com/blueprints
- [ ] **New Blueprint**
- [ ] Connect your GitHub repository
- [ ] Render will use the `render.yaml` file to create both services automatically
- [ ] Just add your environment variables after creation

## ⚡ Free Tier Notes:
- Services sleep after 15 minutes of inactivity
- Cold start time: 30-60 seconds when waking up
- 750 hours/month total usage
- Perfect for demos and testing!

## 🐛 Troubleshooting:
- **Service Unavailable**: Wait 30-60 seconds for service to wake up
- **Failed to fetch**: Check CORS and backend URL configuration
- **Build failed**: Check build logs in Render dashboard
- **Database error**: Verify MongoDB connection string and IP whitelist