import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        console.log('[Auth Middleware] Checking authentication...');

        // Get token from Authorization header
        const authHeader = req.header('Authorization');
        console.log('[Auth Middleware] Auth header:', authHeader ? 'Exists' : 'Missing');

        if (!authHeader) {
            console.log('[Auth Middleware] No Authorization header');
            return res.status(401).json({
                success: false,
                error: 'No Authorization header provided'
            });
        }

        // Extract token (remove "Bearer " prefix)
        const token = authHeader.replace('Bearer ', '');
        console.log('[Auth Middleware] Token extracted:', token ? 'Yes' : 'No');

        if (!token) {
            console.log('[Auth Middleware] No token in header');
            return res.status(401).json({
                success: false,
                error: 'No token provided'
            });
        }

        // Check if JWT_SECRET exists
        if (!process.env.JWT_TOKEN_SECRET) {
            console.error('[Auth Middleware] JWT_SECRET not found in environment');
            return res.status(500).json({
                success: false,
                error: 'Server configuration error'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        console.log('[Auth Middleware] Token decoded successfully:', {
            userId: decoded._id,
            name: decoded.name,
            email: decoded.email
        });

        // Add user info to request object
        req.user = decoded;

        // Continue to next middleware/route
        next();

    } catch (error) {
        console.error('[Auth Middleware] Error:', error.message);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired'
            });
        } else {
            return res.status(500).json({
                success: false,
                error: 'Authentication failed'
            });
        }
    }
};

export default auth;