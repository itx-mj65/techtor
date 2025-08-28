# Vercel Deployment Guide for Techtornix Backend

## 🚀 Ready to Deploy Structure

Your backend has been restructured for Vercel hosting. Here's what changed:

### New Structure:
```
├── api/
│   ├── index.js          # Main Express app entry point
│   ├── serverless.js     # Vercel serverless handler
│   ├── health.js         # Health check endpoint
│   └── [other API files]
├── backend/
│   ├── routes/           # All your route files
│   ├── models/           # MongoDB models
│   ├── middleware/       # Custom middleware
│   └── server.js         # Original server (kept for reference)
├── vercel.json           # Vercel configuration
└── package.json          # Consolidated dependencies
```

## 📋 Pre-Deployment Checklist

### 1. Environment Variables
Set these in your Vercel dashboard:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/techtornix
JWT_SECRET=your-super-secret-jwt-key-here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=https://techtornix.com
NODE_ENV=production
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Deploy to Vercel
```bash
npm run deploy
```

## 🔧 How It Works

1. **Vercel** receives requests and routes them to `/api/*`
2. **`api/index.js`** contains your main Express app
3. **Routes** are imported from the `backend/` folder
4. **All functionality** is preserved but now works with Vercel's serverless architecture

## 📡 API Endpoints

Your API endpoints remain the same:
- `/api/auth/*` - Authentication routes
- `/api/services/*` - Services routes  
- `/api/portfolio/*` - Portfolio routes
- `/api/careers/*` - Careers routes
- `/api/blog/*` - Blog routes
- `/api/contact/*` - Contact routes
- `/api/admin/*` - Admin routes
- `/api/health` - Health check

## 🚨 Important Notes

1. **File Uploads**: Vercel has limitations on file uploads. Consider using cloud storage (AWS S3, Cloudinary) for file uploads.
2. **Database**: Ensure your MongoDB Atlas cluster allows connections from Vercel's IP ranges.
3. **Environment Variables**: Never commit sensitive data. Use Vercel's environment variable system.

## 🐛 Troubleshooting

### Common Issues:
1. **Routes not loading**: Check that all route files exist in `backend/routes/`
2. **MongoDB connection**: Verify your connection string and network access
3. **CORS errors**: Update `CLIENT_URL` in environment variables

### Debug Commands:
```bash
# Test locally
npm run dev

# Check Vercel status
vercel ls

# View logs
vercel logs
```

## ✅ Deployment Commands

```bash
# Deploy to production
npm run deploy

# Deploy to preview
npm run deploy-dev

# Remove deployment
vercel remove
```

## 🔄 Updates

To update your deployed backend:
1. Make changes to your code
2. Commit and push to git
3. Run `npm run deploy`

Your backend is now ready for Vercel hosting! 🎉 