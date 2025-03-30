# RecipesMERN

A full-stack recipe application built with the MERN stack (MongoDB, Express, React, Node.js) that allows users to browse, save, and manage recipes.

## Project Structure

- **API/**: Backend Express server and MongoDB integration
  - Controllers, Models, Routes for users and recipes
  - Authentication using JWT
  - RESTful API endpoints
- **Client/**: Frontend React application
  - Built with Vite, React Router, and other modern technologies
  - Responsive UI with SASS and Framer Motion

## Features

- User authentication (sign up, login)
- Browse recipes
- Save favorite recipes
- Create and manage recipes
- Responsive design

## Technologies Used

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

### Frontend
- React with Vite
- React Router for navigation
- SASS for styling
- Framer Motion for animations
- Axios for API requests
- React Icons

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)

### Backend Setup
1. Navigate to the API directory
   ```
   cd API
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Start the server
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the Client directory
   ```
   cd Client
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Start the development server
   ```
   npm run dev
   ```
The app will be available at localhost:5173
## API Endpoints

- **Users:**
  - POST /api/signup - Register a new user
  - POST /api/login - Authenticate a user
  - GET /api/user - Get user profile

- **Recipes:**
  - GET /api/recipes - Get all recipes
  - GET /api/recipes/:id - Get a specific recipe
  - POST /api/recipes - Create a new recipe
  - PUT /api/recipes/:id - Update a recipe
  - DELETE /api/recipes/:id - Delete a recipe
  - POST /api/recipes/save/:id - Save a recipe to favorites
