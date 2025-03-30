import express from 'express'
import { register, login, profile } from '../controllers/user.js';
import { Authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Register a new user
router.post("/users/register", register);

// Login user
router.post('/users/login', login);

// Get user profile (protected)
router.get('/users/profile', Authenticate, profile);

export default router;
