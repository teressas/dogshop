import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

const protect = asyncHandler(async(req, res, next) => {
    let token;
    // To access cookies sent by the client, use req.cookies, which requires the cookie-parser middleware or similar to parse cookies from the incoming request.
    token = req.cookies.jwt;

    if(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // select specifies which document fields to include or exclude in the result set
            // -password excludes password from the results
            req.user = await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('User not authorized, token failed')
        }
    } else {
        res.status(401).send({ message: 'Not authorized, no token'})
    }
    
})
export { protect };