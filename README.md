# Baraton Express Delivery Service

A full-stack delivery platform for Baraton, Kenya, including website and mobile app.

## Project Structure

- `frontend/` - React web application
- `backend/` - Node.js API server
- `mobile/` - React Native (Expo) mobile app
- `Baraton_Express_Business_Plan.md` - Business plan document

## Setup

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

## Features

- Order placement
- Real-time tracking (basic)
- Admin dashboard (web)
- M-Pesa integration (placeholder)
- WhatsApp ordering (manual)

## Deployment

### MongoDB Atlas Setup
1. Create account at https://www.mongodb.com/atlas
2. Create a free cluster
3. Create database user and whitelist IP
4. Get connection string and update .env in backend

### Frontend Deployment (Vercel)
1. Push code to GitHub
2. Go to https://vercel.com
3. Import project from GitHub
4. Set build command: `npm run build`
5. Deploy

### Backend Deployment (Render)
1. Push backend to GitHub
2. Go to https://render.com
3. Create Web Service
4. Connect GitHub repo
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables (MONGODB_URI, etc.)
8. Deploy

### Mobile App
- Use Expo to build APK: `npx expo build:android`
- Or publish to Expo: `npx expo publish`

## Environment Variables
Create .env in backend:
```
MONGODB_URI=your_mongodb_atlas_uri
GOOGLE_MAPS_API_KEY=your_api_key
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
```

## Next Steps

- Add authentication
- Implement real M-Pesa payment
- Add rider tracking with maps
- Build admin dashboard fully