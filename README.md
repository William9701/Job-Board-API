```markdown
# 💼 Job Board API

A RESTful API for a job board platform where:
- Companies can post jobs
- Users can apply to jobs
- Company admins can manage their job listings and view applicants

> Built with **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**.

---

## ✨ Features

- ✅ User registration & login (JWT authentication)
- ✅ Role-based access: `user` (job seekers), `company_admin` (job posters)
- ✅ Create/manage companies (admin only)
- ✅ Post & browse jobs with pagination
- ✅ Apply to jobs with optional cover letters
- ✅ View applications (for users & company admins)
- ✅ Secure password hashing with `bcrypt`
- ✅ Middleware-protected routes
- ✅ Input validation
- ✅ Sequelize schema with foreign keys

---

## 🛠 Tech Stack

- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT
- **Security**: bcrypt
- **Env Management**: dotenv
- **Testing**: Postman

---

## 📁 Project Structure

```

job-board-api/
├── config/                    # Sequelize config
│   └── database.js
├── controllers/              # Business logic
│   ├── authController.js
│   ├── companyController.js
│   ├── jobController.js
│   └── applicationController.js
├── middleware/               # Auth & role guards
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── models/                   # Sequelize models
│   ├── User.js
│   ├── Company.js
│   ├── Job.js
│   └── Application.js
├── routes/                   # Express routers
│   ├── authRoutes.js
│   ├── companyRoutes.js
│   ├── jobRoutes.js
│   └── applicationRoutes.js
├── .env.example              # Sample environment variables
├── postman\_collection.json   # API testing collection
├── server.js                 # App entry point
├── package.json
└── README.md

````

---

## ⚙️ Prerequisites

- Node.js (v16+)
- PostgreSQL (v12+)
- npm (v8+)
- Postman (optional, for testing)

---

## 🚀 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/William9701/Job-Board-API.git
cd job-board-api
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit your `.env`:

```env
DATABASE_URL=postgres://username:password@localhost:5432/job_board
JWT_SECRET=your_jwt_secret_key
PORT=3000
```

> Replace `username` & `password` with your PostgreSQL credentials.

### 4. Create the Database

```bash
createdb job_board
```

### 5. Apply Migrations (optional)

```bash
npx sequelize-cli db:migrate
```

> Or let Sequelize sync tables at runtime via `sequelize.sync()`.

### 6. Run the Server

#### Development (with hot reload):

```bash
npm run dev
```

#### Production:

```bash
npm start
```

Server runs at: [http://localhost:3000](http://localhost:3000)

---

## 🗃 Database Schema

### `Users`

| Field     | Type      | Notes                   |
| --------- | --------- | ----------------------- |
| id        | Integer   | Primary key             |
| name      | String    | Required                |
| email     | String    | Unique, required        |
| password  | String    | Hashed                  |
| role      | ENUM      | `user`, `company_admin` |
| companyId | Integer   | FK to `Companies`       |
| createdAt | Timestamp |                         |
| updatedAt | Timestamp |                         |

### `Companies`

| Field    | Type    | Notes       |
| -------- | ------- | ----------- |
| id       | Integer | Primary key |
| name     | String  | Required    |
| industry | String  | Required    |
| location | String  | Required    |

### `Jobs`

| Field       | Type    | Notes           |
| ----------- | ------- | --------------- |
| id          | Integer | Primary key     |
| title       | String  | Required        |
| description | Text    | Required        |
| CompanyId   | Integer | FK to Companies |

### `Applications`

| Field       | Type    | Notes       |
| ----------- | ------- | ----------- |
| id          | Integer | Primary key |
| coverLetter | Text    | Optional    |
| UserId      | Integer | FK to Users |
| JobId       | Integer | FK to Jobs  |

---

## 🔐 API Endpoints

### 🔓 Public Routes

#### `POST /auth/register`

* **Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123",
  "role": "user",
  "companyId": 1
}
```

* `companyId` required for `company_admin`.

#### `POST /auth/login`

* **Body**:

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```

#### `GET /jobs`

* Query: `?page=1&limit=10`

#### `GET /jobs/:id`

---

### 🔐 Protected Routes (JWT required)

Add `Authorization: Bearer <token>` header.

#### `POST /companies`

* Create a company (admin only)

#### `POST /jobs`

* Create a job (admin only)

#### `POST /applications`

* Apply to a job

#### `GET /applications/me`

* View your own applications

#### `GET /applications/company`

* Admin view of job applications for their company

---

## 🧪 Postman Testing

Use our shared Postman collection:

👉 [Postman Collection Invite](https://app.getpostman.com/join-team?invite_code=fe88738fce59382cde874aa4a0e3532ef0e26bb0defffa5413de0b16ecc65f2b&target_code=68fa6505087a4b98945d6da0df1832a3)

---

## 📌 Notes

* The app uses `sequelize.sync({ force: false })` to auto-create tables if they don’t exist.
* Setting `force: true` will wipe all existing data. ⚠️ Use with caution.
* Ensure `companyId` in `Users` is properly linked to a real company if the role is `company_admin`.

---

## 📄 License

MIT

---

## 👨‍💻 Author

[William9701](https://github.com/William9701)

```

---

