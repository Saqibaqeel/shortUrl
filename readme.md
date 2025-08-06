# 🔗 URL Shortener Web Application (MERN Stack)

A modern full-stack **URL Shortening Web App** that allows users to generate short URLs, track clicks, and view stats. Built using the **MERN stack**, this app is ready for production and deployed on Render.

**🔗 Live Demo:** [https://makeshorturl.onrender.com](https://makeshorturl.onrender.com)

---

## 📚 Table of Contents

1. [🚀 Features](#-features)  
2. [🧪 Bonus Features](#-bonus-features)  
3. [⚙️ Tech Stack](#️-tech-stack)  
4. [📁 Folder Structure](#-folder-structure)  
5. [🔧 Backend Setup](#-backend-setup)  
6. [💻 Frontend Setup](#-frontend-setup)  
7. [🔐 Environment Variables](#-environment-variables)  
 
8. [🌐 Deployment](#-deployment)  


---

## 🚀 Features

- 🔗 Shorten long URLs into unique short codes.
- 📊 Track total clicks on each short URL.
- 🧭 View individual click history with timestamps.
- 💡 Clean UI built with Bootstrap + Font Awesome.
- 🔁 Reusable components with modular structure.
- 🌍 CORS enabled for frontend-backend communication.

---

## 🧪 Bonus Features

> ✅ **JWT-based Authentication (Backend Only)**  
- Token-based login and protected routes are implemented.
- Secure endpoints using middleware.
- Fully working on backend.  
> ❗Frontend login/signup UI **not yet implemented** due to time constraints.

---

## ⚙️ Tech Stack

### 🖥️ Frontend

- **React.js** (Hooks + Functional Components)  
- **React Router DOM** – Page Routing  
- **Axios** – API Calls  
- **Bootstrap 5** – Responsive UI  
- **Font Awesome** – Icons

### 🛠️ Backend

- **Node.js** – JavaScript runtime  
- **Express.js** – Web server & routing  
- **MongoDB** – NoSQL database  
- **Mongoose** – MongoDB ORM  
- **JWT** – Authentication  
- **CORS** – Cross-Origin Support  
- **Dotenv** – Environment variable management

---

## 📁 Folder Structure

url-shortener/
├── backend/
│ ├── controllers/
│ ├──
│ ├── models/
│ ├── routes/
│ ├── 
│ ├── index.js
│ └── .env
│
└── frontend/
├── public/
└── src/
├── components/
│ ├── Navbar.js
│ ├── ShortenerForm.js
│ └── StatsPage.js
├── App.js
└── index.js


---

## 🔧 Backend Setup

1. Navigate to backend folder:

   ```bash
   cd backend
  npm install
   node index.js
## 🔧 frontend Setup

cd frontend
npm install
npm run dev

## 🔧 enviroment variables

PORT=3000
MONGO_URI=mongodb://localhost:27017/urlshortener
JWT_SECRET=your_jwt_secret_here


