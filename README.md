# MERN Stack Student Management System

A complete MERN stack application with authentication and role-based access control for managing students.

## Features

### Backend

- Node.js, Express, MongoDB, Mongoose
- JWT authentication with bcrypt password hashing
- Role-based access control (Admin & Student)
- Input validation with express-validator
- RESTful API endpoints
- Secure password storage and token management

### Frontend

- React with Vite
- React Router for navigation
- Axios for API calls
- Context API for state management
- React Toastify for notifications
- Tailwind CSS for styling
- Form validation

## User Roles

### Admin

- View all students with pagination
- Create new students
- Update any student information
- Delete students
- Access to admin dashboard

### Student

- View own profile
- Update own profile information
- Change password
- Access to student dashboard

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or connection URI)

### Backend Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-auth-dashboard
JWT_SECRET=your_super_secure_jwt_secret_min_32_characters_long_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

4. Start the server:

```bash
npm run dev
```

Server will run on http://localhost:5000

### Frontend Setup

1. Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables in `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

Client will run on http://localhost:5173

## API Endpoints

### Auth Routes `/api/auth`

- `POST /signup` - Register user + create student profile
- `POST /login` - Authenticate and get JWT token
- `GET /me` - Get current user info (Protected)
- `POST /change-password` - Update password (Protected)
- `POST /logout` - Logout user (Protected)

### Student Routes `/api/students`

- `GET /` - Get all students (Admin) or own profile (Student) (Protected)
- `GET /:id` - Get single student (Protected)
- `POST /` - Create student (Admin only) (Protected)
- `PUT /:id` - Update student (Admin or own profile) (Protected)
- `DELETE /:id` - Delete student (Admin only) (Protected)

## Usage

### Creating First Admin User

1. Sign up normally through the signup page
2. Manually update the user's role in MongoDB:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

### Student Signup Flow

1. User signs up with name, email, password, and course
2. Account is automatically created with student role
3. User is auto-logged in and redirected to student dashboard

### Admin Workflow

1. Login with admin credentials
2. View dashboard with student statistics
3. Add new students using the "Add Student" button
4. Edit or delete existing students from the table
5. Navigate through pages using pagination

### Student Workflow

1. Login with student credentials
2. View profile information
3. Edit profile (name, email, course)
4. Change password from dashboard

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected routes with authentication middleware
- Role-based access control
- Input validation on all forms
- Secure token storage in localStorage
- Auto-logout on 401 errors
- CORS configured for security

## Project Structure

### Backend

```
server/
├── src/
│   ├── configs/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Student.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── studentController.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── roleCheck.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── studentRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   └── app.js
├── server.js
├── .env
└── package.json
```

### Frontend

```
client/src/
├── components/
│   ├── common/
│   │   ├── Navbar.jsx
│   │   ├── Loader.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── RoleRoute.jsx
│   │   ├── Pagination.jsx
│   │   └── ConfirmDialog.jsx
│   ├── admin/
│   │   ├── StudentList.jsx
│   │   ├── StudentForm.jsx
│   │   └── StudentStats.jsx
│   └── student/
│       ├── ProfileCard.jsx
│       └── EditProfile.jsx
├── pages/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── admin/
│   │   └── AdminDashboard.jsx
│   └── student/
│       └── StudentDashboard.jsx
├── context/
│   ├── AuthContext.jsx
│   └── StudentContext.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   └── studentService.js
├── App.jsx
└── main.jsx
```

## Technologies Used

### Backend

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication
- bcryptjs - Password hashing
- express-validator - Input validation
- CORS - Cross-origin resource sharing

### Frontend

- React - UI library
- Vite - Build tool
- React Router - Routing
- Axios - HTTP client
- Context API - State management
- React Toastify - Notifications
- Tailwind CSS - Styling

## License

MIT
