# 🪐 PlanetsQA

A full-stack planetary Q&A forum where users can register, log in, ask questions about planets, and submit answers. Built with Node.js, Express, MySQL, and React.

---

## 🌐 Live Demo

- **Frontend:** [https://project-04-blond.vercel.app/]
- **Backend:** [https://project-04-production.up.railway.app/]

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- CSS

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
PlanetsQA/
├── backend/                         # Node.js + Express backend
│   ├── middleware/
│   │   └── auth.js                  # JWT authentication middleware
│   │
│   ├── routes/
│   │   ├── auth.js                  # User registration & login routes
│   │   ├── categories.js            # Category retrieval endpoints
│   │   ├── questions.js             # Question CRUD operations
│   │   └── answers.js               # Answer CRUD operations
│   │
│   ├── db.js                        # MySQL database connection setup
│   ├── server.js                    # Express server entry point
│   └── package.json                 # Backend dependencies & scripts
│
└── frontend/                        # React frontend
    ├── public/
    │   └── Small_Earth.png          # Static assets
    │
    └── src/
        ├── pages/
        │   ├── Login.jsx            # User login page
        │   ├── Register.jsx         # User registration page
        │   └── Dashboard.jsx        # Main application dashboard
        │
        ├── styles/
        │   ├── Login.css            # Login page styles
        │   ├── Register.css         # Registration page styles
        │   └── Dashboard.css        # Dashboard styles
        │
        ├── api.js                   # Axios API configuration
        ├── App.jsx                  # Application routing
        └── index.css                # Global styles

---

## 🚀 Installation & Local Setup

Follow these steps to run PlanetsQA on your own machine.

### Prerequisites

Make sure you have these installed:
- [Node.js](https://nodejs.org) (v18 or higher)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Git](https://git-scm.com)

### 1 — Clone the Repository

```bash
git clone https://github.com/ZecheryAce/Projects-04.git
cd PlanetsQA
```

### 2 — Set Up the Database

1. Open MySQL Workbench and connect to your local instance
2. Run the following SQL to create the database and tables:

```sql
CREATE DATABASE planetsqa;
USE planetsqa;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  user_id INT NOT NULL,
  category_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  body TEXT NOT NULL,
  user_id INT NOT NULL,
  question_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO categories (name) VALUES
  ('Mercury'), ('Venus'), ('Earth'), ('Mars'),
  ('Jupiter'), ('Saturn'), ('Uranus'), ('Neptune');
```

### 3 — Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder: