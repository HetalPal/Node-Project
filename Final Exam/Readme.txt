# 🚀 Task Management API

## 📌 Overview

This project is a **Task Management REST API** built using **Node.js, Express, and MongoDB**. It includes **JWT-based authentication** and allows users to manage their tasks securely.

---

## ✨ Features

* User Registration & Login
* Secure Password Hashing (bcrypt)
* JWT Authentication
* Protected Routes using Middleware
* Full CRUD Operations for Tasks
* Environment Variables using dotenv
* Proper Error Handling (try-catch + status codes)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (jsonwebtoken)
* bcryptjs
* dotenv

---

## 📁 Project Structure

```
task-api/
│
├── config/
│   └── dbConnect.js
├── controllers/
│   ├── auth.controller.js
│   └── task.controller.js
├── middleware/
│   └── auth.js
├── models/
│   ├── user.model.js
│   └── task.model.js
├── routes/
│   ├── auth.routes.js
│   └── task.routes.js
├── .env
├── app.js
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies

```
npm install
```

### 2. Create `.env` File

```
PORT=8080
MONGO_URL=mongodb://127.0.0.1:27017/taskDB
JWT_SECRET=your_secret_key
```

### 3. Run Server

```
npm start
```

Server will run on:

```
http://localhost:8080
```

---

## 🔐 Authentication APIs

### ➤ Register

**POST** `/auth/register`

### ➤ Login

**POST** `/auth/login`

📌 Returns JWT Token

---

## 📋 Task APIs (Protected)

⚠️ Add Header:

```
authorization: Bearer YOUR_TOKEN
```

### ➤ Create Task

**POST** `/api/add-task`

### ➤ Get All Tasks

**GET** `/api/tasks`

### ➤ Update Task

**PUT** `/api/update-task/:id`

### ➤ Delete Task

**DELETE** `/api/delete-task/:id`

---

## 🔑 Authentication Flow

1. User registers
2. User logs in → gets JWT token
3. Token is sent in request headers
4. Middleware verifies token
5. Access granted to protected APIs

---

## 📊 Status Codes

* 200 → Success
* 201 → Created
* 401 → Unauthorized
* 404 → Not Found
* 500 → Server Error

---

## ⚠️ Important Notes

* Do not expose `.env` file
* Always hash passwords
* Use Bearer token format in headers
* Restart server after config changes

---

## 👨‍💻 Author

**Hetal Pal**

---

## 📄 License

This project is created for educational purposes.
