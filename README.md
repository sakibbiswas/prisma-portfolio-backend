# 🧠 My Portfolio Website – Backend (Express + Prisma/MongoDB)
## 📋 Project Overview

`This is the backend of the personal Portfolio Website, built with Express.js, TypeScript, and Prisma/Mongoose.`
`It provides secure authentication, content management APIs, and dynamic endpoints for blogs, projects, and user data.`
`The backend serves as the data and API layer for the Next.js frontend application.`

## ⚙️ Tech Stack
`Runtime: Node.js`

`Framework: Express.js`

`Database: PostgreSQL (Prisma ORM)`

`Auth: JWT + bcrypt`

`Validation: Zod / Express Validator`

`Security: Helmet, CORS, dotenv`

`File Uploads: Multer + Cloudinary`

`Language: TypeScript`

## 🔐 Core Features

### 🧑‍💻 Authentication & Authorization

`Secure JWT-based authentication system.`

`Passwords hashed using bcrypt.`

`Middleware to verify token and protect private routes.`

`Seed script creates an admin user during setup.`

### 🧠 Dashboard Management

`Admin-only dashboard API endpoints for:`

`Blog CRUD operations.`

`Project CRUD operations.`

`Updating personal info.`

### 📰 Blog Management

`Public API for reading all or individual blogs.`

`Admin APIs for creating, updating, deleting blogs.`

`Supports Cloudinary image uploads for thumbnails.`

### 💼 Project Showcase

`Public endpoints for fetching project details.`

`Admin endpoints for adding/updating/deleting projects.`

`Fields include title, description, tech stack, links, and thumbnails.`

### 👤 About Me

`Static personal details, work experience, and skills fetched using SSG from the frontend.`

### ⚡ Installation & Setup

#### 1️⃣ Clone the Repository
`git clone` [https://github.com/sakibbiswas/prisma-portfolio-backend]
`cd portfolio-backend`

`2️⃣ Install Dependencies`
`npm install`


#### 🧩 Author

##### Sazzadur Rahman Sakib
###### Fullsatack Developer
📧 [sakibsakib99880@gmail.com]
🌐 [https://prisma-backend-portfolio.vercel.app]