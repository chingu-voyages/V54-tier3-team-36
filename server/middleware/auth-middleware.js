import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');

        if (!authHeader) {
            console.log('[Auth Middleware] No Authorization header');
            return res.status(401).json({
                success: false,
                error: 'No Authorization header provided'
            });
        }

        const token = authHeader.replace('Bearer ', '');

        if (!token) {
            console.log('[Auth Middleware] No token in header');
            return res.status(401).json({
                success: false,
                error: 'No token provided'
            });
        }

        if (!process.env.JWT_TOKEN_SECRET) {
            return res.status(500).json({
                success: false,
                error: 'Server configuration error'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

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