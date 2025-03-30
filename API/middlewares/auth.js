import { User } from "../Models/User.js";
import jwt from 'jsonwebtoken'


const JWT_SECRET = "!@#$%^&*()"; // TODO: Move to environment variables

export const Authenticate = async (req, res, next) => {
    // Check for token in Authorization header (Bearer token) or custom Auth header
    const authHeader = req.header("Authorization") || req.header("Auth");
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required. Please login first."
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user;  // Store user object
        req.userId = user._id;  // Store user ID 
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token"
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired"
            });
        }
        return res.status(500).json({
            message: error.message || "Authentication error"
        });
    }
}