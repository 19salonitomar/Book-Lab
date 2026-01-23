# Book Inventory Management System

A full-stack Book Inventory Management System built with the MERN stack.  
This application allows users to manage books efficiently using CRUD operations with a clean, responsive, and interactive user interface.

---

## Project Overview

The Book Inventory Management System is a web application that enables users to manage a collection of books. Users can add, view, update, delete, and explore detailed information about books. All data is fetched dynamically from a backend API and stored securely in a database.

The project follows real-world application architecture and fulfills all assignment requirements including API integration, responsive UI, data validation, and structured routing.

---

## Features

- User authentication (Login & Register)
- Protected routes using JWT authentication
- Add new books with image upload
- View all books in a tabular format
- View detailed book information on a separate page
- Edit existing book details
- Delete books from inventory
- Image upload and preview support
- Responsive and scrollable UI
- Proper form validation
- API-driven dynamic data rendering

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (Image Upload)
- JSON Web Token (JWT)
- dotenv

---

## API Endpoints

| Method | Endpoint | Description |
|------|---------|------------|
| GET | `/api/books` | Fetch all books |
| POST | `/api/books` | Add a new book |
| PUT | `/api/books/:id` | Update book |
| DELETE | `/api/books/:id` | Delete book |

---

## Environment Variables

### Backend `.env`
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

### Frontend `.env`
VITE_API_URL=http://localhost:5000/api

--

## Installation & Setup

### Backend Setup
cd backend
npm install
npm run dev


### Frontend Setup
```
cd frontend
npm install
npm run dev

```

## Author

**Saloni Tomar**  
Full Stack Developer  

---

## License

This project is created for educational and assignment purposes.
