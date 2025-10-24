#!/bin/bash

# 🚀 Render Deployment Automation Script
# This script helps you quickly deploy your Campus AI app to Render

echo "🎯 Campus AI - Render Deployment Helper"
echo "======================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the CampAI root directory"
    exit 1
fi

echo "✅ Project structure verified"

# Create necessary files for Render deployment
echo "📝 Creating Render configuration files..."

# Create render.yaml for easier deployment
cat > render.yaml << 'EOF'
# Render Blueprint for Campus AI Suggestion Box

services:
  # Backend API Service
  - type: web
    name: campus-ai-backend
    env: node
    region: oregon
    plan: free
    branch: main
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: MONGODB_URI
        sync: false  # Set manually in Render dashboard
      - key: OPENAI_API_KEY
        sync: false  # Set manually in Render dashboard
      - key: FRONTEND_URL
        value: https://campus-ai-frontend.onrender.com

  # Frontend Static Site
  - type: web
    name: campus-ai-frontend
    env: static
    region: oregon
    plan: free
    branch: main
    rootDir: frontend
    buildCommand: npm install && npm run build
    staticPublishPath: build
    envVars:
      - key: REACT_APP_BACKEND_URL
        value: https://campus-ai-backend.onrender.com
EOF

# Update backend package.json to ensure proper start script
echo "🔧 Updating backend configuration..."
cd backend

# Ensure package.json has correct scripts
if ! grep -q '"start".*"node server.js"' package.json; then
    # Backup original
    cp package.json package.json.backup
    
    # Update package.json with proper start script
    cat package.json | jq '.scripts.start = "node server.js"' > temp.json && mv temp.json package.json
    echo "✅ Updated backend start script"
fi

cd ..

# Update frontend for production
echo "🔧 Updating frontend configuration..."
cd frontend

# Create production environment file
cat > .env.production << 'EOF'
REACT_APP_BACKEND_URL=https://campus-ai-backend.onrender.com
EOF

echo "✅ Created production environment file"

cd ..

# Create deployment checklist
cat > RENDER-CHECKLIST.md << 'EOF'
# 📋 Render Deployment Checklist

## Before You Start:
- [ ] GitHub repository is up to date
- [ ] MongoDB Atlas cluster is created
- [ ] OpenAI API key is ready

## Deployment Steps:

### 1. MongoDB Atlas Setup:
- [ ] Go to cloud.mongodb.com
- [ ] Create free M0 cluster
- [ ] Create database user: `campusadmin`
- [ ] Whitelist IP: `0.0.0.0/0`
- [ ] Copy connection string

### 2. Deploy Backend:
- [ ] Go to render.com
- [ ] New → Web Service
- [ ] Connect CampusAI repository
- [ ] Set root directory: `backend`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add environment variables:
  - [ ] MONGODB_URI
  - [ ] OPENAI_API_KEY
  - [ ] PORT=10000
  - [ ] FRONTEND_URL=https://campus-ai-frontend.onrender.com
- [ ] Deploy and note backend URL

### 3. Deploy Frontend:
- [ ] New → Static Site
- [ ] Connect CampusAI repository
- [ ] Set root directory: `frontend`
- [ ] Set build command: `npm install && npm run build`
- [ ] Set publish directory: `build`
- [ ] Add environment variable:
  - [ ] REACT_APP_BACKEND_URL=[your-backend-url]
- [ ] Deploy and note frontend URL

### 4. Update Backend:
- [ ] Update FRONTEND_URL in backend environment variables
- [ ] Redeploy backend service

### 5. Test:
- [ ] Visit frontend URL
- [ ] Submit test feedback
- [ ] Check admin dashboard
- [ ] Generate QR code

## URLs:
- Frontend: https://campus-ai-frontend.onrender.com
- Backend: https://campus-ai-backend.onrender.com
- Admin: https://campus-ai-frontend.onrender.com/admin
- QR Code: https://campus-ai-frontend.onrender.com/qr
EOF

echo "✅ Created deployment checklist"

# Git operations
echo "📤 Preparing for deployment..."
git add .
git commit -m "Add Render deployment configuration and helpers"

echo ""
echo "🎉 Render deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Follow RENDER-DEPLOYMENT.md guide"
echo "3. Use RENDER-CHECKLIST.md to track progress"
echo "4. Your render.yaml file is ready for Blueprint deployment"
echo ""
echo "🚀 Ready to deploy to Render!"