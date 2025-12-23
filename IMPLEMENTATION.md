# 🎓 MERN Stack Student Management System

A comprehensive full-stack authentication and student management system with role-based access control.

## ✨ Features Implemented

### 🔐 Authentication & Authorization

- ✅ **JWT-based Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **Role-Based Access Control** - Admin and Student roles
- ✅ **Protected Routes** - Frontend and backend route protection
- ✅ **Auto-redirect** - Role-based dashboard routing after login

### 👥 User Roles

#### 🔑 Admin Role

- View all students with pagination (10 per page)
- Create new student records
- Edit any student information
- Delete student records
- View dashboard statistics:
  - Total students
  - Active courses count
  - Students enrolled this month
- Full CRUD operations on student data

#### 👨‍🎓 Student Role

- View own profile only
- Edit profile (name, email, course)
- Change password securely
- Cannot access admin features
- Personal dashboard with profile card

### 📚 Course Management

- **10 Pre-defined Courses:**
  1. MERN Stack Development
  2. Full Stack Web Development
  3. Frontend Development
  4. Backend Development
  5. Data Science & Analytics
  6. Machine Learning
  7. DevOps Engineering
  8. Mobile App Development
  9. UI/UX Design
  10. Python Programming

### 🎨 UI/UX Features

- ✅ Beautiful gradient backgrounds
- ✅ Clean, modern design with Tailwind CSS
- ✅ Responsive layout (mobile-friendly)
- ✅ Toast notifications for user actions
- ✅ Loading spinners and states
- ✅ Form validation with error messages
- ✅ Confirm dialogs for delete operations
- ✅ Role badges and visual indicators
- ✅ Hover effects and transitions

### 🔒 Security Features

- Password validation (minimum 6 characters)
- Email format validation
- Protected API endpoints
- Role verification middleware
- Token expiration (7 days)
- Secure password change flow
- Auto-logout on 401 errors

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (running locally or connection URI)
- npm or yarn

### Installation

#### Backend Setup

```bash
cd server
npm install
```

Configure `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-auth-dashboard
JWT_SECRET=your_super_secure_jwt_secret_min_32_characters_long_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start server:

```bash
npm run dev
```

#### Frontend Setup

```bash
cd client
npm install
```

Configure `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start client:

```bash
npm run dev
```

## 📋 Usage Guide

### Creating Your First Admin

**Option 1: Register as Admin (Recommended)**

1. Go to signup page
2. Fill in details
3. Select "Admin" from Account Type dropdown
4. Complete registration

**Option 2: Convert Existing User**

```javascript
// In MongoDB
use mern-auth-dashboard
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

### Creating Students

**As Admin:**

1. Login to admin dashboard
2. Click "Add Student" button
3. Fill form with:
   - Name
   - Email
   - Course (select from dropdown)
4. Student account created automatically

**Self Registration:**

1. Go to signup page
2. Fill registration form
3. Select course from dropdown
4. Keep "Student" as account type
5. Auto-login after signup

### Dashboard Features

**Admin Dashboard:**

- Statistics cards showing:
  - Total student count
  - Number of active courses
  - Monthly enrollments
- Searchable student table
- Pagination controls
- Quick edit/delete actions

**Student Dashboard:**

- Profile information card
- Edit profile section
- Change password functionality
- Enrollment date display

## 🏗️ Project Structure

```
project/
├── server/
│   ├── src/
│   │   ├── configs/
│   │   │   └── db.js              # MongoDB connection
│   │   ├── models/
│   │   │   ├── User.js            # User schema (email, password, role)
│   │   │   └── Student.js         # Student schema (name, email, course)
│   │   ├── controllers/
│   │   │   ├── authController.js  # Authentication logic
│   │   │   └── studentController.js # Student CRUD operations
│   │   ├── middlewares/
│   │   │   ├── auth.js            # JWT verification
│   │   │   └── roleCheck.js       # Role-based authorization
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # /api/auth/* routes
│   │   │   └── studentRoutes.js   # /api/students/* routes
│   │   ├── utils/
│   │   │   └── generateToken.js   # JWT token generator
│   │   └── app.js
│   ├── server.js
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx           # Navigation with auth state
│   │   │   │   ├── Loader.jsx           # Loading spinner
│   │   │   │   ├── PrivateRoute.jsx     # Auth protection
│   │   │   │   ├── RoleRoute.jsx        # Role-based routing
│   │   │   │   ├── Pagination.jsx       # Page navigation
│   │   │   │   └── ConfirmDialog.jsx    # Delete confirmation
│   │   │   ├── admin/
│   │   │   │   ├── StudentList.jsx      # Student table
│   │   │   │   ├── StudentForm.jsx      # Add/Edit modal
│   │   │   │   └── StudentStats.jsx     # Statistics cards
│   │   │   └── student/
│   │   │       ├── ProfileCard.jsx      # Profile display
│   │   │       └── EditProfile.jsx      # Profile edit form
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx            # Login page
│   │   │   │   └── Signup.jsx           # Registration page
│   │   │   ├── admin/
│   │   │   │   └── AdminDashboard.jsx   # Admin dashboard
│   │   │   └── student/
│   │   │       └── StudentDashboard.jsx # Student dashboard
│   │   ├── context/
│   │   │   ├── AuthContext.jsx          # Auth state management
│   │   │   └── StudentContext.jsx       # Student data management
│   │   ├── services/
│   │   │   ├── api.js                   # Axios instance
│   │   │   ├── authService.js           # Auth API calls
│   │   │   └── studentService.js        # Student API calls
│   │   ├── constants/
│   │   │   └── courses.js               # Course list constants
│   │   ├── App.jsx                      # Main app with routing
│   │   └── main.jsx
│   └── .env
│
└── README.md
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

```
POST   /signup            # Register new user
POST   /login             # Authenticate user
GET    /me                # Get current user (Protected)
POST   /change-password   # Update password (Protected)
POST   /logout            # Logout user (Protected)
```

### Student Routes (`/api/students`)

```
GET    /                  # Get students (Admin: all, Student: own)
GET    /:id               # Get single student (Protected)
POST   /                  # Create student (Admin only)
PUT    /:id               # Update student (Admin or own)
DELETE /:id               # Delete student (Admin only)
```

## 🎯 Key Improvements Made

### Clean Authentication Flow

- Proper role validation on signup
- Conditional student profile creation (only for student role)
- Enhanced error handling
- Clean response structures

### Role-Based Access

- Backend middleware enforcement
- Frontend route guards
- UI element visibility based on role
- Proper authorization checks

### Better UX

- Course dropdown instead of text input
- Role selection on signup
- Visual statistics with icons
- Gradient backgrounds
- Better form styling
- Loading states
- Success/error notifications

### Code Quality

- Centralized course constants
- Consistent error handling
- Clean component structure
- Proper validation
- Type safety considerations

## 🔍 Testing Checklist

- [ ] Register as student - auto-redirects to student dashboard
- [ ] Register as admin - auto-redirects to admin dashboard
- [ ] Student can view only own profile
- [ ] Student can edit own profile
- [ ] Student can change password
- [ ] Admin can view all students
- [ ] Admin can add new students
- [ ] Admin can edit any student
- [ ] Admin can delete students
- [ ] Pagination works correctly
- [ ] Statistics update properly
- [ ] Protected routes redirect to login
- [ ] Role-based redirects work
- [ ] Logout clears session
- [ ] Form validations work
- [ ] Error messages display

## 🛠️ Technologies Used

**Backend:**

- Express.js - Web framework
- MongoDB - Database
- Mongoose - ODM
- JWT - Authentication tokens
- bcryptjs - Password hashing
- express-validator - Input validation

**Frontend:**

- React 19 - UI library
- Vite - Build tool
- React Router v7 - Routing
- Axios - HTTP client
- Context API - State management
- React Toastify - Notifications
- Tailwind CSS - Styling

## 📝 License

MIT

## 👨‍💻 Developer Notes

This project demonstrates:

- Full-stack MERN development
- JWT authentication implementation
- Role-based access control
- RESTful API design
- React Context API for state
- Protected route implementation
- Clean code practices
- Modern UI/UX design
