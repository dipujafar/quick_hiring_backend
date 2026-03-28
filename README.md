# QuickHiring — Backend

> A robust REST API powering the QuickHiring job portal. Handles job listings, applications, admin authentication, and file uploads — built with Express.js, MongoDB, and AWS S3.

---

## 📌 Project Overview

**QuickHiring Backend** is the server-side API for the QuickHiring platform. It handles all business logic including job management, application processing, admin authentication, JWT-based route protection, and image uploads via AWS S3.

The API is structured with a clean modular architecture under `src/app/modules/`, with each feature (jobs, applications, auth) having its own controller, service, route, model, interface, and validation files.

---

## ✨ Features

### 💼 Jobs

- Get all jobs
- Get a single job by ID
- Post a new job _(admin only)_
- Update a job _(admin only)_
- Delete a job _(admin only)_

### ⭐ Featured Jobs

- Get all featured jobs
- Toggle/update featured status by job ID _(admin only)_

### 📋 Applications

- Submit a new application
- Get all applications
- Get a single application by ID
- Update an application
- Delete an application

### 🔐 Auth

- Admin login with JWT access & refresh tokens
- JWT middleware to protect admin routes
- Zod validation on all incoming request bodies

### 🖼️ Image Uploads

- Images uploaded directly to **AWS S3**
- Secure bucket credentials via environment variables

---

## 🚀 Tech Stack

| Technology                                    | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| [Express.js](https://expressjs.com/)          | HTTP server & routing                   |
| [MongoDB](https://www.mongodb.com/)           | Database                                |
| [Mongoose](https://mongoosejs.com/)           | ODM for MongoDB                         |
| [JWT](https://jwt.io/)                        | Admin authentication & route protection |
| [Zod](https://zod.dev/)                       | Request body validation                 |
| [AWS S3](https://aws.amazon.com/s3/)          | Image/file uploads                      |
| [Nodemailer](https://nodemailer.com/)         | Email notifications                     |
| [TypeScript](https://www.typescriptlang.org/) | Type safety                             |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── class/
│   ├── config/
│   ├── constants/
│   ├── error/
│   ├── helpers/
│   ├── interface/
│   ├── middleware/
│   └── modules/
│       ├── applications/
│       │   ├── applications.constants.ts
│       │   ├── applications.controller.ts
│       │   ├── applications.interface.ts
│       │   ├── applications.models.ts
│       │   ├── applications.route.ts
│       │   ├── applications.service.ts
│       │   ├── applications.utils.ts
│       │   └── applications.validation.ts
│       ├── auth/
│       │   ├── auth.constant.ts
│       │   ├── auth.controller.ts
│       │   ├── auth.interface.ts
│       │   ├── auth.route.ts
│       │   ├── auth.service.ts
│       │   ├── auth.utils.ts
│       │   └── auth.validation.ts
│       ├── jobs/
│       │   └── ...                   # Same module pattern as above
│       └── user/
│           ├── user.constants.ts
│           ├── user.controller.ts
│           ├── user.interface.ts
│           ├── user.models.ts
│           ├── user.route.ts
│           ├── user.service.ts
│           ├── user.utils.ts
│           └── user.validation.ts
├── routes/
├── types/
│   └── global.d.ts
├── utils/
├── app.ts
└── server.ts
```

---

## 🌐 API Endpoints

### Jobs

| Method   | Endpoint           | Access | Description      |
| -------- | ------------------ | ------ | ---------------- |
| `GET`    | `/api/v1/jobs`     | Public | Get all jobs     |
| `GET`    | `/api/v1/jobs/:id` | Public | Get a job by ID  |
| `POST`   | `/api/v1/jobs`     | Admin  | Create a new job |
| `PATCH`  | `/api/v1/jobs/:id` | Admin  | Update a job     |
| `DELETE` | `/api/v1/jobs/:id` | Admin  | Delete a job     |

### Featured Jobs

| Method  | Endpoint                        | Access | Description            |
| ------- | ------------------------------- | ------ | ---------------------- |
| `GET`   | `/api/v1/jobs/feature/featured` | Public | Get all featured jobs  |
| `PATCH` | `/api/v1/jobs/feature/:id`      | Admin  | Toggle featured status |

### Applications

| Method   | Endpoint                   | Access | Description           |
| -------- | -------------------------- | ------ | --------------------- |
| `POST`   | `/api/v1/applications`     | Public | Submit an application |
| `GET`    | `/api/v1/applications`     | Admin  | Get all applications  |
| `GET`    | `/api/v1/applications/:id` | Admin  | Get application by ID |
| `PATCH`  | `/api/v1/applications/:id` | Admin  | Update an application |
| `DELETE` | `/api/v1/applications/:id` | Admin  | Delete an application |

### Auth

| Method | Endpoint             | Access | Description                      |
| ------ | -------------------- | ------ | -------------------------------- |
| `POST` | `/api/v1/auth/login` | Public | Admin login — returns JWT tokens |

---

## 🛡️ Validation

- **JWT** — All admin routes are protected via JWT middleware. Requests without a valid `accessToken` are rejected.
- **Zod** — All `POST` and `PATCH` request bodies are validated using Zod schemas defined in each module's `*.validation.ts` file. Invalid payloads return structured error responses.

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- An [AWS S3](https://aws.amazon.com/s3/) bucket with access credentials

---

### 1. Clone the Repository

```bash
git clone https://github.com/dipujafar/quick_hiring_backend.git
cd quick_hiring_backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root of the project and fill in the values:

```dotenv
# -----------------------------------------------
# Database
# -----------------------------------------------
DATABASE_URL=                         # Your MongoDB Atlas connection string

# -----------------------------------------------
# Server
# -----------------------------------------------
PORT=5000
SOCKET_PORT=5005
IP="10.10.10.78"
CLIENT_URL="http://202.83.124.110:3000"
SERVER_URL="http://10.10.10.78:5001/api/v1"
BASE_URL="http://10.10.10.78:5001/"

# -----------------------------------------------
# Admin
# -----------------------------------------------
ADMIN_MAIL="admin@gmail.com"

# -----------------------------------------------
# Auth / JWT
# -----------------------------------------------
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN="30d"
JWT_REFRESH_EXPIRES_IN="365d"

# -----------------------------------------------
# Nodemailer
# -----------------------------------------------
NODEMAILER_HOST_EMAIL=your_email@gmail.com
NODEMAILER_HOST_PASS=your_app_password

# -----------------------------------------------
# AWS S3
# -----------------------------------------------
S3_BUCKET_ACCESS_KEY=your_access_key
S3_BUCKET_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_BUCKET_NAME=your_bucket_name
```

### 4. Run Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

## 📜 Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Compile TypeScript to JavaScript
npm run start      # Start production server
npm run lint       # Run ESLint
```

---

## ⚡ Auto Module Generator

The project includes a built-in code generator to scaffold new API modules instantly.

```bash
npm run generate
```

You will be prompted to:

1. **Enter the source route** of the file (e.g., `src/app/modules`)
2. **Enter the module/file name** (e.g., `reviews`)

This auto-generates the full module folder with all standard files: `controller`, `service`, `route`, `model`, `interface`, `validation`, `constants`, and `utils`.

---

## 🔗 Related Repositories

- **Frontend:** [Quick-Hiring-Frontend](https://github.com/dipujafar/Quick-Hiring-Frontend.git)
- **Backend:** [quick_hiring_backend](https://github.com/dipujafar/quick_hiring_backend.git)
