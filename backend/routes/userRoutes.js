import express from "express";
import { authUser, registerUser, logoutUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser)
router.post('/auth', authUser)
router.post('/logout', protect, logoutUser)

export default router;

/* TO DO: 
add JOI -> YUP validation
*/