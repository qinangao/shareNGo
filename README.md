# shareNGo

A full-stack web application that allows users to share their travel memories and locations with others. Built with React and featuring a modern, responsive UI powered by shadcn/ui components and interactive mapping capabilities.

## Features

- **Memory Sharing**: Create and share your travel experiences with photos, descriptions, and locations
- **Interactive Maps**: View and explore travel locations using Leaflet maps
- **User Authentication**: Secure user registration and login system with form validation
- **Memory Feed**: Browse and discover travel memories from other users
- **File Upload**: Drag-and-drop image uploading
- **Responsive Design**: Beautiful, mobile-friendly interface using shadcn/ui components

## Tech Stack

### Frontend

- **React 19** - Modern user interface library
- **shadcn/ui** - High-quality component library built on Radix UI
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v7** - Client-side routing
- **React Leaflet** - Interactive maps integration
- **React Hook Form** - Performant forms with easy validation

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database

### Additional Tools

- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Image storage and optimisation
- **Render** - Web server hosting

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/shareNGo.git
   cd shareNGo
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

4. **Environment Configuration**

   Create a `.env` file in the backend directory:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## Development

1. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

2. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## Available Scripts

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality

### Backend

- `npm run dev` - Start the development server with nodemon
- `npm start` - Start the production server

## Deployment

### Frontend (Vercel/Netlify)

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform

### Backend (Render)

1. Push your code to GitHub
2. Connect your repository to your hosting platform
3. Set environment variables
4. Deploy

## Key Dependencies

### UI & Styling

- **shadcn/ui** - Modern component library with Radix UI primitives
- **Tailwind CSS** - Utility-first styling with animations
- **Lucide React** - Beautiful, customisable icons

### Forms & Validation

- **React Hook Form** - Efficient form handling
- **Zod** - Runtime type checking and validation
- **Hookform Resolvers** - Validation library integration

### Maps & Location

- **Leaflet** - Open-source interactive maps
- **React Leaflet** - React components for Leaflet

### File Handling

- **shadcn-dropzone** - Drag-and-drop file upload component

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Licence

This project is licensed under the MIT Licence - see the [LICENCE](LICENCE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Contact the maintainers

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com/) for the exceptional component library
- [Radix UI](https://www.radix-ui.com/) for accessible UI primitives
- [Leaflet](https://leafletjs.com/) for the mapping solution
- [MongoDB](https://www.mongodb.com/) for the database solution
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework

---

**Happy Travelling! 🌍✈️**
