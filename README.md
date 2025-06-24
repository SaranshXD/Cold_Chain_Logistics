# ❄️ Cold Chain Logistics Management System

A comprehensive web-based system for managing and monitoring the supply chain of **perishable goods**, ensuring safety, efficiency, and real-time condition tracking through every stage of transportation and storage.

---

## 📋 Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Modules Implemented](#modules-implemented)  
- [Project Structure](#project-structure)  
- [Installation & Usage](#installation--usage)  
- [Snapshots](#snapshots)  
- [License](#license)  

---

## 🧠 Overview

This project focuses on building a **Cold Chain Logistics** platform to ensure that perishable goods (like food, vaccines, and medicines) are transported under controlled temperature and humidity conditions. It provides functionalities such as user authentication, inventory tracking, condition monitoring, route planning, and order status updates.

---

## 🚀 Features

- 🔐 User Registration & Login  
- 📦 Add & View Perishable Inventory  
- 🧾 Create and Track Orders  
- 🌡️ Real-time Temperature & Humidity Monitoring  
- 🗺️ Route Optimization for Deliveries  
- 📊 Dashboard with Current Inventory and Conditions  
- 📬 Email Notifications for Threshold Violations (optional)  

---

## 🛠 Tech Stack

- **Frontend**: React.js, HTML, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Other Tools**: Nodemailer, JWT, REST API, Crypto, GIS APIs (optional for route planning)  

---

## 📁 Modules Implemented

1. **SignUp( )** – User registration module  
2. **Login( )** – Secure login with JWT  
3. **AddInventory( )** – Add new perishable stock  
4. **ViewInventoryLevels( )** – Display current stock and expiry details  
5. **CreateOrder( )** – Place new supply orders  
6. **TrackOrder( )** – View real-time order status  
7. **MonitorConditions( )** – Logs temperature/humidity during transit  
8. **PlanRoute( )** – Suggests optimized delivery route  

---

## 📂 Project Structure

```
cold-chain-logistics/
│
├── client/                         # React Frontend
│   ├── public/
│   │   └── index.html
│   │
│   ├── src/
│   │   ├── assets/                 # Static files (images, icons, etc.)
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Page components (Home, Login, Dashboard, etc.)
│   │   ├── styles/                 # CSS/Tailwind styling
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── setupTests.js
│   │
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
├── server/                         # Express Backend
│   ├── controllers/                # Route logic (e.g., auth, inventory)
│   ├── middleware/                 # Auth, error handlers
│   ├── models/                     # Mongoose schemas
│   ├── routes/                     # Express routes
│   ├── config/                     # DB config, constants
│   ├── utils/                      # Utility functions (e.g., fetchUser)
│   ├── db.js                       # MongoDB connection
│   ├── server.js                   # Main entry point
│   ├── .gitignore
│   └── package.json
│
└── README.md                       # Project overview (root-level if needed)

```

---

## ⚙️ Installation & Usage

```bash
# Clone the repo
git clone https://github.com/your-username/cold-chain-logistics.git
cd cold-chain-logistics

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Run backend server
cd ../backend
npm start

# Run frontend app
cd ../frontend
npm start
```

> Ensure MongoDB is running locally or set up with an Atlas connection.

---

## 🖼️ Snapshots
<img src="https://github.com/user-attachments/assets/d6b9dce2-da28-4df7-a78d-9233df391a81" alt="Alt text" width="1920" height="480"> 
<img src="https://github.com/user-attachments/assets/07b52844-c996-49f1-982e-53c4f9e0bddd" alt="Alt text" width="1920" height="480">
<img src="https://github.com/user-attachments/assets/33ef262a-87b4-459a-b5a0-3627cd791d85" alt="Alt text" width="1920" height="480"> |

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use and modify it for educational and commercial purposes.
