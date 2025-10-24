# 🚨 DEPLOYMENT TROUBLESHOOTING GUIDE

## 🔧 **Common Issues & Instant Fixes**

### **❌ Problem: "Service Unavailable" or "This site can't be reached"**
**🎯 Cause:** Free tier services sleep after 15 minutes of inactivity

**✅ INSTANT FIX:**
1. Wait 30-60 seconds
2. Refresh the page
3. The service will wake up automatically

**💡 Why this happens:** Render free tier puts services to sleep to save resources

---

### **❌ Problem: "Failed to fetch" or CORS errors**
**🎯 Cause:** Frontend can't connect to backend

**✅ INSTANT FIX:**
1. Check your frontend environment variable:
   - Go to Render → Frontend service → Environment
   - Verify `REACT_APP_BACKEND_URL` is your actual backend URL
   - Should look like: `https://campus-ai-backend-xxxx.onrender.com`

2. Check your backend environment variable:
   - Go to Render → Backend service → Environment  
   - Verify `FRONTEND_URL` is your actual frontend URL
   - Should look like: `https://campus-ai-frontend.onrender.com`

3. Save changes → Wait 2 minutes for redeploy

---

### **❌ Problem: "Database connection failed"**
**🎯 Cause:** MongoDB connection issues

**✅ INSTANT FIX:**
1. **Check Connection String:**
   - Go to MongoDB Atlas → Database → Connect
   - Verify your connection string has:
     - Correct username (`campusadmin`)
     - Correct password (no `<>` brackets)
     - Database name: `campus-suggestion-box`

2. **Check IP Whitelist:**
   - MongoDB Atlas → Network Access
   - Should have `0.0.0.0/0` (Allow from anywhere)

3. **Test Connection String:**
   ```
   mongodb+srv://campusadmin:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/campus-suggestion-box?retryWrites=true&w=majority
   ```

---

### **❌ Problem: Build Failed**
**🎯 Cause:** Missing dependencies or configuration

**✅ INSTANT FIX:**
1. **Check Build Logs:**
   - Render Dashboard → Your service → Logs tab
   - Look for specific error messages

2. **Common Build Fixes:**
   - Ensure `package.json` exists in root directory specified
   - For backend: Root Directory = `backend`
   - For frontend: Root Directory = `frontend`

3. **Redeploy:**
   - Go to service → Settings → Manual Deploy

---

### **❌ Problem: Admin Dashboard Shows No Data**
**🎯 Cause:** No feedback submitted yet or database connection issue

**✅ INSTANT FIX:**
1. **Submit Test Feedback:**
   - Go to your main app URL
   - Fill out and submit feedback form
   - Check admin dashboard again

2. **Check API Endpoint:**
   - Visit: `your-backend-url/api/feedback`
   - Should show JSON array (might be empty `[]`)

---

### **❌ Problem: Environment Variables Not Working**
**🎯 Cause:** Variables not saved properly

**✅ INSTANT FIX:**
1. **Re-add Variables:**
   - Render Dashboard → Service → Environment tab
   - Delete old variables
   - Add new ones exactly as specified

2. **Required Backend Variables:**
   ```
   MONGODB_URI = your_full_connection_string
   OPENAI_API_KEY = fallback_mode
   PORT = 10000
   FRONTEND_URL = your_frontend_url
   NODE_ENV = production
   ```

3. **Required Frontend Variables:**
   ```
   REACT_APP_BACKEND_URL = your_backend_url
   ```

---

### **❌ Problem: OpenAI API Errors**
**🎯 Cause:** Invalid API key or quota exceeded

**✅ INSTANT FIX:**
1. **Use Fallback Mode:**
   - Set `OPENAI_API_KEY = fallback_mode`
   - App works perfectly with keyword-based categorization

2. **If You Want OpenAI:**
   - Get valid API key from https://platform.openai.com/api-keys
   - Replace `fallback_mode` with your actual key

---

## 🔍 **How to Debug Any Issue:**

### **1. Check Service Status:**
- Render Dashboard → Your service
- Green = Running, Yellow = Building, Red = Failed

### **2. View Logs:**
- Service → Logs tab
- Look for error messages in red

### **3. Test Each Component:**
- **Backend API:** `your-backend-url/api/feedback`
- **Frontend:** `your-frontend-url`
- **Database:** Submit feedback and check if it appears

### **4. Environment Variables:**
- Double-check all variables are set correctly
- No extra spaces or quotes
- URLs include `https://`

---

## ⚡ **Quick Health Check:**

### **✅ Everything Working If:**
1. Frontend loads without errors
2. Can submit feedback successfully
3. Admin dashboard shows submitted feedback
4. QR code generator works
5. Backend API returns JSON response

### **🔧 Something's Wrong If:**
1. "Service Unavailable" after 2 minutes
2. "Failed to fetch" errors persist
3. Submitted feedback doesn't appear
4. Build fails repeatedly

---

## 🆘 **Emergency Reset (If All Else Fails):**

### **1. Delete and Recreate Services:**
1. Delete both services from Render
2. Follow EASY-DEPLOY.md from scratch
3. Use exact same settings

### **2. Check GitHub Repository:**
1. Ensure latest code is pushed
2. Repository should be public
3. All files present (backend/, frontend/, etc.)

---

## 📞 **Still Need Help?**

### **Check These Resources:**
1. **Render Status:** https://status.render.com
2. **MongoDB Status:** https://status.cloud.mongodb.com
3. **Your GitHub Repo:** https://github.com/SrijanAthghara/CampusAI

### **Common Working Examples:**
- Backend URL: `https://campus-ai-backend-abcd.onrender.com`
- Frontend URL: `https://campus-ai-frontend-xyz.onrender.com`
- MongoDB URI: `mongodb+srv://campusadmin:password@cluster0.abc.mongodb.net/campus-suggestion-box`

**99% of issues are fixed with the solutions above! 🎯**

Remember: Free tier services sleep - always wait 60 seconds before panicking! 😊