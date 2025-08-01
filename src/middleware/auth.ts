// src/middleware/auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '../utils/auth'; // Assuming you have a utility to verify tokens
import { logger } from '../utils/logger'; // Importing the logger utility

/**
 * Middleware to ensure that only authenticated users can access the settings API endpoint.
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function.
 */
const authMiddleware = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const user = await verifyToken(token); // Verify the token

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = user; // Attach user information to the request object
        next(); // Proceed to the next middleware or API handler
    } catch (error) {
        logger.error('Authentication error:', error); // Log the error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default authMiddleware;