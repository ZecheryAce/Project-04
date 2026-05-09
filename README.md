# 🪐 PlanetsQA

A full-stack planetary Q&A forum where users can register, log in, ask questions about planets, and submit answers. Built with Node.js, Express, MySQL, and React.

---

## 🌐 Live Demo

- **Frontend:** [https://project-04-blond.vercel.app/]
- **Backend:** [https://project-04-production.up.railway.app/]

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Register Page
![Register Page](screenshots/register.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS (custom space theme)

### Backend
- Node.js
- Express
- MySQL2
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- dotenv (environment variables)
- cors

### Database
- MySQL (local development)
- Railway MySQL (production)

### Hosting
- Frontend: Vercel
- Backend + Database: Railway

---

## ✨ Features

- User registration with validation
  - Username must contain only letters, numbers, and underscores
  - Password must be at least 8 characters and contain a number
  - Passwords must match
  - Must agree to Terms and Conditions
- User login with JWT authentication
- Protected routes — must be logged in to post questions or answers
- Browse 8 planet categories (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune)
- Post questions inside any category
- Click any question to view and submit answers
- Questions and answers displayed in chronological order
- Logout functionality
- Fully responsive space-themed dark UI
- Custom favicon and page title

---

## 📁 Project Structure