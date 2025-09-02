# MERN Authentication System

A **complete MERN Stack Authentication system** with OTP verification, email confirmation, password reset, protected routes, and logout functionality.  
Unlike most tutorials, this project covers **end-to-end auth flow** with security best practices.

---

## ✨ Features

- 🔑 **User Registration** with OTP verification  
- 📧 **Email Confirmation** after successful verification  
- 🔐 **Login with JWT Authentication**  
- 👤 **Fetch User Profile / Data** (protected route)  
- 🔄 **Password Reset via OTP & Email Verification**  
- 🚪 **Logout with JWT Blacklisting**  
- 🛡️ **Security best practices** (hashed passwords, JWT expiry, input validation)

---

## 🛠️ Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Auth:** JWT, bcrypt, express-validator  
- **Email/OTP:** Nodemailer  
- **Tools:** GitHub, Postman

---

## ⚙️ API Endpoints

### 1️⃣ **POST** `/users/register`  
Registers a new user and sends OTP for verification.

**Request Body:**
```jsonc
{
  "fullname": {
    "firstname": "John",      // required, string, min 3 chars
    "lastname": "Doe"         // optional, string, min 3 chars if provided
  },
  "email": "john.doe@example.com", // required, valid email
  "password": "yourpassword"       // required, string, min 6 chars
}
```

**Response:**
```jsonc
{
  "message": "OTP sent to your email for verification"
}
```

**Error Example:**
```jsonc
{
  "errors": [
    {
      "msg": "Email already registered" // or other validation error messages
    }
  ]
}
```

---

### 2️⃣ **POST** `/users/verify-otp`

Verifies OTP, activates the account, and sends a confirmation email.

**Request Body:**
```jsonc
{
  "email": "user@example.com", // required, valid email
  "otp": "123456"              // required, string, 6 digits
}
```

**Response:**
```jsonc
{
  "message": "Account verified successfully. You can now log in."
}
```

**Error Example:**
```jsonc
{
  "errors": [
    {
      "msg": "Invalid or expired OTP"
    }
  ]
}
```

---

### 3️⃣ **POST** `/users/login`

Authenticates a verified user and returns a JWT token.

**Request Body:**
```jsonc
{
  "email": "john.doe@example.com", // required, valid email
  "password": "yourpassword"       // required, string, min 6 chars
}
```

**Response:**
```jsonc
{
  "token": "<JWT_TOKEN>",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

**Error Example:**
```jsonc
{
  "errors": [
    {
      "msg": "Invalid email or password"
    }
  ]
}
```

---

### 4️⃣ **GET** `/users/profile`

Fetches authenticated user profile.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```jsonc
{
  "_id": "user_id",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

**Error Example:**
```jsonc
{
  "errors": [
    {
      "msg": "Unauthorized or invalid token"
    }
  ]
}
```

---

### 5️⃣ **POST** `/users/reset-password-request`

Sends OTP for password reset to registered email.

**Request Body:**
```jsonc
{
  "email": "user@example.com" // required, valid email
}
```

**Response:**
```jsonc
{
  "message": "OTP sent to your email for password reset"
}
```

**Error Example:**
```jsonc
{
  "errors": [
    {
      "msg": "Email not found"
    }
  ]
}
```

---

### 6️⃣ **POST** `/users/reset-password`

Verifies OTP, email, and new password, then resets the password.

**Request Body:**
```jsonc
{
  "email": "user@example.com",     // required, valid email
  "otp": "123456",                 // required, string, 6 digits
  "newPassword": "newSecurePass"   // required, string, min 6 chars
}
```

**Response:**
```jsonc
{
  "message": "Password reset successfully"
}
```

**Error Example:**
```jsonc
{
  "errors": [
    {
      "msg": "Invalid OTP or email"
    }
  ]
}
```

---

### 7️⃣ **POST** `/users/logout`

Logs out the current user by blacklisting JWT token.

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```jsonc
{
  "message": "Logged out Successfully"
}
```

**Error Example:**
```jsonc
{
  "errors": [
    {
      "msg": "Unauthorized or invalid token"
    }
  ]
}
```

---

## ⚠️ Security Considerations

- ✔️ Strong JWT secrets stored in environment variables
- ✔️ Passwords hashed using bcrypt
- ✔️ Input validation with express-validator
- ✔️ Token expiry implemented
- ✔️ Error messages sanitized for client

---

## 🚀 Getting Started

Clone the repo:
```sh
git clone https://github.com/yourusername/mern-auth-system.git
cd mern-auth-system
```

Install dependencies:
```sh
npm install
```

Add environment variables (`.env` file):
```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

Run backend:
```sh
cd backend
npx nodemon
```

Run frontend (React):
```sh
cd frontend
npm run dev
```

---

## 📸 Screenshots

- Registration with OTP email
- Account verification email
- Login screen
- Profile fetch (Postman example)
- Password reset flow

---

👉 **GitHub Repo Link:** [https://github.com/ayushsingh2005-coder/Mern-Authentication](https://github.com/ayushsingh2005-coder/Authentication-fullstack/tree/main)

---

## 🤝 Contribution

Contributions and suggestions are welcome! Feel free to fork, raise issues, or submit PRs.

---

## 📧 Contact

Developed by Ayush Singh  
🌐 LinkedIn:(https://www.linkedin.com/in/ayush-singh-2a0158295/)
