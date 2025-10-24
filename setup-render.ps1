# 🚀 Render Deployment Setup Script for Windows
# Run this in PowerShell from your CampAI directory

Write-Host "🎯 Campus AI - Render Deployment Helper" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (!(Test-Path "package.json") -or !(Test-Path "backend") -or !(Test-Path "frontend")) {
    Write-Host "❌ Error: Please run this script from the CampAI root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project structure verified" -ForegroundColor Green

# Create render.yaml for Blueprint deployment
Write-Host "📝 Creating Render configuration files..." -ForegroundColor Yellow

$renderYaml = @"
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
"@

$renderYaml | Out-File -FilePath "render.yaml" -Encoding UTF8

# Create production environment file for frontend
Write-Host "🔧 Updating frontend configuration..." -ForegroundColor Yellow

$prodEnv = @"
REACT_APP_BACKEND_URL=https://campus-ai-backend.onrender.com
"@

$prodEnv | Out-File -FilePath "frontend\.env.production" -Encoding UTF8

# Create deployment checklist
$checklist = @"
# 📋 Render Deployment Checklist

## Before You Start:
- [ ] GitHub repository is up to date
- [ ] MongoDB Atlas cluster is created
- [ ] OpenAI API key is ready

## Deployment Steps:

### 1. MongoDB Atlas Setup:
- [ ] Go to cloud.mongodb.com
- [ ] Create free M0 cluster
- [ ] Create database user: ``campusadmin``
- [ ] Whitelist IP: ``0.0.0.0/0``
- [ ] Copy connection string

### 2. Deploy Backend:
- [ ] Go to render.com
- [ ] New → Web Service
- [ ] Connect CampusAI repository
- [ ] Set root directory: ``backend``
- [ ] Set build command: ``npm install``
- [ ] Set start command: ``npm start``
- [ ] Add environment variables:
  - [ ] MONGODB_URI
  - [ ] OPENAI_API_KEY
  - [ ] PORT=10000
  - [ ] FRONTEND_URL=https://campus-ai-frontend.onrender.com
- [ ] Deploy and note backend URL

### 3. Deploy Frontend:
- [ ] New → Static Site
- [ ] Connect CampusAI repository
- [ ] Set root directory: ``frontend``
- [ ] Set build command: ``npm install && npm run build``
- [ ] Set publish directory: ``build``
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

## 🔗 Final URLs:
- **Frontend**: https://campus-ai-frontend.onrender.com
- **Backend**: https://campus-ai-backend.onrender.com
- **Admin**: https://campus-ai-frontend.onrender.com/admin
- **QR Code**: https://campus-ai-frontend.onrender.com/qr

## 🚀 One-Click Deploy Alternative:
You can also use the ``render.yaml`` file for Blueprint deployment:
1. Go to render.com/blueprints
2. Connect your GitHub repository
3. Render will automatically create both services
4. Just add your environment variables
"@

$checklist | Out-File -FilePath "RENDER-CHECKLIST.md" -Encoding UTF8

Write-Host "✅ Created deployment files" -ForegroundColor Green

# Check git status
Write-Host "📤 Preparing for deployment..." -ForegroundColor Yellow

Write-Host ""
Write-Host "🎉 Render deployment preparation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Files Created:" -ForegroundColor Cyan
Write-Host "  ✅ render.yaml (Blueprint deployment file)" -ForegroundColor White
Write-Host "  ✅ frontend\.env.production (Production config)" -ForegroundColor White
Write-Host "  ✅ RENDER-CHECKLIST.md (Step-by-step guide)" -ForegroundColor White
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Add and commit files: git add . && git commit -m 'Add Render config'" -ForegroundColor White
Write-Host "  2. Push to GitHub: git push origin main" -ForegroundColor White
Write-Host "  3. Follow RENDER-DEPLOYMENT.md guide" -ForegroundColor White
Write-Host "  4. Use RENDER-CHECKLIST.md to track progress" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to deploy to Render!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Pro Tip: Use render.yaml for one-click Blueprint deployment!" -ForegroundColor Yellow