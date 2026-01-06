# 🚀 Login Backend API

[![Node.js](https://img.shields.io/badge/Node.js-v20-green?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18-blue?style=for-the-badge&logo=express)](https://expressjs.com)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql)](https://mysql.com)
[![License](https://img.shields.io/badge/License-MIT-brightgreen)](LICENSE)

Production-ready **User Management Backend** with full CRUD operations.

## ✨ Features
- 🔐 Secure bcrypt password hashing
- 📊 Full RESTful CRUD APIs
- 🛡️ Input validation + error handling
- ⚡ MySQL connection pooling
- 🧪 Proper HTTP status codes (200/400/404/500)

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/master/create/register` | Create new user |
| `GET` | `/master/create/` | Get all users |
| `PUT` | `/master/create/:id` | Update user |
| `DELETE` | `/master/create/:id` | Delete user |

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/YOURUSERNAME/login-backend-api.git
cd login-backend-api
npm install

## Environment (.env)
