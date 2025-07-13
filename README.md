# shareNGo

A full-stack web application that allows users to share their travel memories and locations with others. Built with the MERN stack and featuring a modern, responsive UI powered by Flowbite components.

## Features

- **Memory Sharing**: Create and share your travel experiences with photos, descriptions, and locations
- **Interactive Maps**: View and explore travel locations on an interactive map
- **User Authentication**: Secure user registration and login system
- **Memory Feed**: Browse and discover travel memories from other users
- **Location Tagging**: Tag specific locations for your travel memories
- **Responsive Design**: Beautiful, mobile-friendly interface using Flowbite components
- **User Profiles**: Personalized profiles showcasing individual travel journeys

## Tech Stack

### Frontend

- **React.js** - User interface library
- **Flowbite** - Modern component library for React
- **Tailwind CSS** - Utility-first CSS framework (via Flowbite)
- **React Router** - Client-side routing

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database

### Additional Tools

- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimization (optional)

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/travel-memories-app.git
   cd travel-memories-app
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/travel-memories
   JWT_SECRET=your-jwt-secret-key
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-key
   CLOUDINARY_API_SECRET=your-cloudinary-secret
   ```

   Create a `.env` file in the frontend directory:

   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_MAPBOX_TOKEN=your-mapbox-token
   ```

## Usage

1. **Start the backend server**

   ```bash
   cd backend
   npm start
   ```

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm start
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Memories

- `GET /api/memories` - Get all memories
- `POST /api/memories` - Create a new memory
- `GET /api/memories/:id` - Get specific memory
- `PUT /api/memories/:id` - Update memory
- `DELETE /api/memories/:id` - Delete memory

### Users

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainers

## Acknowledgments

- [Flowbite](https://flowbite.com/) for the beautiful UI components
- [MongoDB](https://www.mongodb.com/) for the database solution
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework

---

**Happy Traveling! 🌍✈️**
