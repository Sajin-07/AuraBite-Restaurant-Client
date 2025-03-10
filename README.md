# **AuraBite Restaurant – MERN Stack Project**

## 🌟 **Overview**
AuraBite is a **MERN stack** restaurant management system that offers a seamless experience for both customers and administrators. It includes secure authentication, AI-powered chat assistance, reservation management, and online payment integration.

---

## **👤 User Dashboard**
### 🔹 **Key Features**
- **📜 Menu Browsing** – Explore the restaurant’s menu with ease.
- **🛒 Cart & Orders** – Add items to the cart (requires login).
- **🔐 Secure Authentication** –
  - Firebase authentication with Google & email-password login.
  - Email verification and CAPTCHA validation for security.
- **💳 Online Payments** – Secure transactions via **SSLCommerz**.
- **📧 Email Notifications** – Payment confirmation emails sent via **SendGrid**.
- **⭐ Customer Reviews** – Submit reviews and provide feedback.
- **📅 Reservations** – Book a table effortlessly.
- **📜 History Tracking** – View **payment** and **reservation** history.
- **🤖 AI Chatbot** – Get instant assistance via **Gemini AI** chatbot.

---

## **🛠️ Admin Dashboard**
### 🔹 **Key Features**
- **👥 User Management** –
  - View all users.
  - Promote users to admins.
  - Remove user accounts if necessary.
- **🍽️ Menu Management** –
  - Add new menu items (image uploads handled by **ImageBB**).
  - Update or delete menu items.
- **📌 Reservation Control** –
  - Approve or decline reservation requests.

---

## **🖥️ Server-Side Implementation**
### 🔹 **Security & Middleware**
- **🔑 JWT Authentication** – Secure authentication using **JSON Web Tokens (JWT)**.
- **🛡️ Middleware Protection** – Implemented `verifyToken` and `verifyAdmin` for secured API routes.
- **🚪 Auto Logout** – Users are automatically logged out when their token expires.

---

## **📌 Tech Stack**
- **Frontend** – React.js, Tailwind CSS
- **Backend** – Node.js, Express.js
- **Database** – MongoDB, Mongoose
- **Authentication** – Firebase Auth, JWT
- **Payments** – SSLCommerz
- **File Storage** – ImageBB
- **Email Service** – SendGrid
- **AI Chatbot** – Gemini AI
- **Hosting** – Firebase (Frontend), Vercel (Backend)

---

## **🚀 Getting Started**

### **🔧 Installation**
```bash
# Clone the repository
https://github.com/Sajin-07/AuraBite-Restaurant-Client.git

# Navigate to the project directory
cd AuraBite-Restaurant-Client-main

# Install dependencies (for both frontend & backend)
npm install
```

### **▶ Running the Application**
#### **Frontend**
```bash
npm run dev  # Start the React app
```

#### **Backend**
Server Repo Link: [AuraBite Server with Aggregate](https://github.com/Sajin-07/AuraBite-Restaurant-Server).
```bash
cd AuraBite-Restaurant-Server-main  # Navigate to the backend directory
node server.js  # Start the Express server
```

---

## **📜 License**
This project is licensed under the **MIT License**.

---

## **📩 Contact**
For any queries or contributions, feel free to reach out!

📧 Email: [sifatsajin88@gmail.com](mailto:sifatsajin88@gmail.com)

🌐 Project Repo: [GitHub](https://github.com/Sajin-07/AuraBite-Restaurant-Client)

