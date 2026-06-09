# FleetRouteIQ-v1 🚚

AI-Powered Fleet Optimization Dashboard built with the MERN Stack

## Overview

FleetRouteIQ is a full-stack fleet management and route optimization platform that enables users to:

- Manage fleet vehicles
- Monitor vehicle locations in real-time
- Analyze route efficiency(Routes are hard-coded. I will ship the feature for adding routes in the near future hopefully.)
- Predict fuel costs and delays
- Generate AI-powered route recommendations
- Visualize fleet analytics through interactive dashboards

The project simulates a logistics intelligence platform similar to modern fleet management and route optimization systems.

---

## Live Demo

🔗 [FleetRouteIQ Live Demo(Ctrl + Click to open in a new tab)](https://fleetrouteiq-v1-git-main-reet1010s-projects.vercel.app/)

## Features

### Authentication & Security

- User Registration & Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

### Fleet Management

- Add Vehicles
- View Fleet Vehicles
- Vehicle Ownership Management
- Vehicle Status Tracking

### Real-Time Tracking

- Socket.io based live updates
- Real-time vehicle movement simulation
- Interactive map visualization using Leaflet
- Live marker updates

### Analytics Dashboard

- Fleet statistics overview
- Total distance travelled
- Fuel consumption tracking
- Active vehicle monitoring
- Fleet health metrics
- Interactive charts using Recharts

### Route Intelligence

- Route Analysis Engine
- Fuel Cost Prediction
- Delay Prediction
- Route Scoring Algorithm
- AI Recommendation System
- Multi-route Comparison

### Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- MongoDB Atlas database

---

## Tech Stack

### Frontend

- React
- React Router
- Context API
- Axios
- Socket.io Client
- React Leaflet
- Recharts

### Backend

- Node.js
- Express.js
- Socket.io
- JWT Authentication
- bcrypt.js

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- Render

---

## Project Architecture

Frontend (React)
↓
Axios + Socket.io
↓
Backend (Express.js)
↓
MongoDB Atlas

Real-Time Layer:
Socket.io
↓
Vehicle Location Updates
↓
Live Map Tracking

---

## Folder Structure

### Backend

```text
server/
├── src/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── sockets/
│ └── server.js
```

### Frontend

```text
client/
├── src/
│ ├── pages/
│ ├── components/
│ ├── layouts/
│ ├── context/
│ ├── hooks/
│ ├── services/
│ └── routes/
```

---

## Environment Variables

### Backend

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

### Frontend

VITE_API_URL=your_Render_deployment_url

---

## Installation

### Backend

cd server

npm install

npm run dev

### Frontend

cd client

npm install

npm run dev

---

## Future Enhancements

- Geofencing Alerts
- Driver Performance Analytics
- Maintenance Prediction
- Route History Tracking
- GPS Device Integration
- Traffic API Integration
- Fuel Optimization Engine
- Fleet Utilization Forecasting

---
