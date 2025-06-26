Job Board API
A RESTful API for a job board platform where companies can post jobs, users can apply to them, and company admins can manage their company’s job listings and applications. Built with Node.js, Express, PostgreSQL, and Sequelize.
Features

User registration and login with JWT authentication
Role-based access: user (job applicants) and company_admin (company job managers)
Create and manage companies (company_admin only)
Post and list jobs with pagination
Apply to jobs with optional cover letters
View applications for users and company admins
Secure password hashing with bcrypt
Protected routes with JWT middleware
Input validation for registration, company creation, and job applications
Database schema with foreign key relationships for data integrity

Tech Stack

Node.js + Express: Backend framework
PostgreSQL: Relational database
Sequelize: ORM for database interactions
JWT: Authentication tokens
bcrypt: Password hashing
dotenv: Environment variable management
Postman: API testing (via provided collection)

Project Structure
job-board-api/
├── config/
│   └── database.js        # Sequelize database configuration
├── controllers/
│   ├── authController.js  # User registration and login
│   ├── companyController.js # Company creation
│   ├── jobController.js   # Job creation and listing
│   └── applicationController.js # Job application management
├── middleware/
│   ├── authMiddleware.js  # JWT authentication
│   └── roleMiddleware.js  # Role-based authorization
├── models/
│   ├── User.js            # User model (users table)
│   ├── Company.js         # Company model (companies table)
│   ├── Job.js            # Job model (jobs table)
│   └── Application.js    # Application model (applications table)
├── routes/
│   ├── authRoutes.js      # Authentication routes
│   ├── companyRoutes.js   # Company routes
│   ├── jobRoutes.js       # Job routes
│   └── applicationRoutes.js # Application routes
├── .env.example           # Example environment variables
├── package.json           # Project dependencies and scripts
├── postman_collection.json # Postman collection for API testing
├── README.md              # This file
└── server.js              # Main server entry point

Prerequisites

Node.js (v16 or higher)
PostgreSQL (v12 or higher)
npm (v8 or higher)
Postman (optional, for testing)

Setup

Clone the Repository:
git clone git@github.com:William9701/Job-Board-API.git
cd job-board-api


Install Dependencies:Install the required Node.js packages:
npm install


Set Up Environment Variables:Copy the .env.example file to .env and configure it:
cp .env.example .env

Edit .env with your PostgreSQL credentials:
DATABASE_URL=postgres://username:password@localhost:5432/job_board
JWT_SECRET=your_jwt_secret_key
PORT=3000


Replace username and password with your PostgreSQL credentials.
Use a secure, unique JWT_SECRET (e.g., a 32-character random string).
Ensure the database name is job_board.


Set Up PostgreSQL Database:

Ensure PostgreSQL is running:sudo service postgresql start  # Linux
# or use your system's method (e.g., pgAdmin, Docker)


Create the job_board database:createdb job_board




Apply Database Migrations:If you’ve added migrations (e.g., for companyId in the Users table), run:
npx sequelize-cli db:migrate

Alternatively, the server uses sequelize.sync({ force: false }) to create tables automatically on startup.

Run the Server:Start the server in development mode with nodemon for auto-reloading:
npm run dev

Or start in production mode:
npm start

The server will run on http://localhost:3000 (or the PORT specified in .env).


Database Schema
The database is managed by Sequelize and consists of the following tables in the public schema:

Users:
id: Integer, primary key, auto-increment
name: String, required
email: String, required, unique
password: String, required (hashed with bcrypt)
role: ENUM('user', 'company_admin'), default 'user'
companyId: Integer, foreign key to Companies(id), nullable
createdAt, updatedAt: Timestamps


Companies:
id: Integer, primary key, auto-increment
name: String, required
industry: String, required
location: String, required
createdAt, updatedAt: Timestamps


Jobs:
id: Integer, primary key, auto-increment
title: String, required
description: Text, required
CompanyId: Integer, foreign key to Companies(id)
createdAt, updatedAt: Timestamps


Applications:
id: Integer, primary key, auto-increment
coverLetter: Text, optional
UserId: Integer, foreign key to Users(id)
JobId: Integer, foreign key to Jobs(id)
createdAt, updatedAt: Timestamps



Notes:

The sequelize.sync({ force: false }) in server.js creates these tables if they don’t exist.
If force: true is used, existing tables are dropped and recreated, which may delete data. Use with caution in production.
The companyId in Users links company admins to their companies, added via a migration.

API Endpoints
Public Routes

POST /auth/register
Register a new user.
Body: { "name": "string", "email": "string", "password": "string", "role": "user|company_admin", "companyId": number }
Notes: companyId is required for company_admin role and must reference an existing company.
Response: { user: { id, name, email, role, companyId }, token }


POST /auth/login
Login and receive a JWT token.
Body: { "email": "string", "password": "string" }
Response: { user: { id, name, email, role, companyId }, token }


GET /jobs
List all jobs with pagination.
Query: ?page=number&limit=number
Response: [ { id, title, description, CompanyId, createdAt, updatedAt, Company: { id, name, industry, location } } ]


GET /jobs/:id
Get job details by ID.
Response: { id, title, description, CompanyId, createdAt, updatedAt, Company: { id, name, industry, location } }



Protected Routes (Require JWT in Authorization: Bearer <token> Header)

POST /companies
Create a company (company_admin only).
Body: { "name": "string", "industry": "string", "location": "string" }
Response: { id, name, industry, location, createdAt, updatedAt }


POST /jobs
Create a job (company_admin only).
Body: { "title": "string", "description": "string", "companyId": number }
Response: { id, title, description, CompanyId, createdAt, updatedAt }


POST /applications
Apply to a job (authenticated users).
Body: { "jobId": number, "coverLetter": "string" }
Response: { id, UserId, JobId, coverLetter, createdAt, updatedAt }


GET /applications/me
List current user’s applications.
Response: [ { id, UserId, JobId, coverLetter, createdAt, updatedAt, Job: { id, title, description, Company: { id, name, industry, location } } } ]


GET /applications/company
List applications for company jobs (company_admin only).
Response: [ { id, UserId, JobId, coverLetter, createdAt, updatedAt, Job: { id, title, description, Company: { id, name, industry, location } }, User: { name, email } } ]



Testing with Postman


## POSTMAN LINK
https://app.getpostman.com/join-team?invite_code=fe88738fce59382cde874aa4a0e3532ef0e26bb0defffa5413de0b16ecc65f2b&target_code=68fa6505087a4b98945d6da0df1832a3

