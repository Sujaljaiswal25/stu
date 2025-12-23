# Quick Start Guide

## 1. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows (if MongoDB is installed as service)
net start MongoDB

# Or start manually
mongod
```

## 2. Start Backend Server

```bash
cd server
npm run dev
```

Backend will run on http://localhost:5000

## 3. Start Frontend Client

Open a new terminal:

```bash
cd client
npm run dev
```

Frontend will run on http://localhost:5173

## 4. Access the Application

Open your browser and go to: http://localhost:5173

## 5. Create First Admin (Optional)

### Method 1: Using MongoDB Compass or Shell

After creating a user through signup, update their role:

```javascript
use mern-auth-dashboard
db.users.updateOne(
  { email: "youremail@example.com" },
  { $set: { role: "admin" } }
)
```

### Method 2: Temporarily modify signup

In `server/src/controllers/authController.js`, temporarily change:

```javascript
role: role || 'student',
// to
role: role || 'admin',
```

Then signup, and change it back.

## Default Test Users

After setting up, you can create:

### Admin User

- Email: admin@example.com
- Password: admin123
- Role: admin (set manually in DB)

### Student User

- Email: student@example.com
- Password: student123
- Role: student (default)

## Common Issues

### MongoDB Connection Error

- Check if MongoDB is running
- Verify MONGO_URI in server/.env

### Port Already in Use

- Change PORT in server/.env
- Change port in client/.env VITE_API_URL

### CORS Errors

- Ensure CLIENT_URL in server/.env matches your frontend URL

## Next Steps

1. Login with student account to test student dashboard
2. Login with admin account to manage all students
3. Test CRUD operations (Create, Read, Update, Delete)
4. Test pagination in admin dashboard
5. Test password change functionality
