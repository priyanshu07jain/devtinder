# 🚀 DevTinder: Backend Architecture & Implementation

A comprehensive MERN stack application designed to master the intricacies of **Node.js, Express, and MongoDB**. This project document's a journey from basic server setup to complex business logic, security, and database optimization.

---

## 🏗️ Project Architecture Overview



## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose ODM
- **Security:** Bcrypt, JWT (JSON Web Tokens), Cookie-Parser
- **Validation:** Validator, Custom Schema Validation
- **Tools:** Postman, Nodemon, Git

---

## 🛤️ Learning Path & Features

### 🔹 Phase 1: Foundational Setup
- [x] Initialized Node environment (`npm init`) and Git version control.
- [x] Built core Express server listening on Port 7777.
- [x] Implemented first request handlers and understood `package.json` dependency management.

### 🔹 Phase 2: Routing Deep Dive
- [x] Mastered Route Order importance and dynamic routing (`req.params`).
- [x] Implemented support for all HTTP methods: **GET, POST, PATCH, DELETE**.
- [x] Explored advanced routing patterns using **Regex** and query parameters.

### 🔹 Phase 3: Middleware & Request Pipeline
- [x] Implemented the `next()` function and custom middleware chains.
- [x] Created global **Auth Middleware** for restricted routes.
- [x] Centralized **Error Handling** using Express middleware.

### 🔹 Phase 4 & 5: Database & CRUD Operations
- [x] Connected to **MongoDB Atlas** using Mongoose.
- [x] Engineered a `UserSchema` and handled data ingestion via `express.json`.
- [x] Built full CRUD functionality: Feed retrieval, User deletion, and partial updates (PATCH vs PUT).



### 🔹 Phase 6: Validation & Sanitization
- [x] **Golden Rule:** Never trust `req.body`.
- [x] Integrated `validator` library for email/password/URL sanitization.
- [x] Implemented custom validators and Mongoose timestamps.

### 🔹 Phase 7: Auth, JWT & Security
- [x] Password encryption using **Bcrypt** (hashing & salting).
- [x] Implemented **JWT-based Authentication** stored in HTTP-only cookies.
- [x] Created reusable Schema methods: `.getJWT()` and `.comparePassword()`.

### 🔹 Phase 8: Scalable Refactoring
- [x] Refactored monolithic code into **Express Routers** (`authRouter`, `profileRouter`, `requestRouter`).
- [x] Implemented Logout, Profile Editing, and Password reset logic.

### 🔹 Phase 9: Complex Business Logic (Connections)
- [x] Developed the `ConnectionRequest` schema with complex status validation.
- [x] Implemented **Compound Indexes** in MongoDB for optimized query performance.
- [x] Leveraged `$or` and `$and` queries for relationship management.
- [x] Used Mongoose `.populate()` to link user data across collections.

### 🔹 Phase 10: Advanced Feed & Pagination
- [x] Built a smart **Feed API** that filters out:
    - The logged-in user themselves.
    - Already connected users.
    - Users with pending requests.
- [x] Implemented **Pagination** logic using `.skip()` and `.limit()` formulas:
    - `skip = (page - 1) * limit`

