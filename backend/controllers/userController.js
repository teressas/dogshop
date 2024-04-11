import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc Register user
// @route POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    
    const newUser = await User.create({ name, email, password });

    if(newUser) {
        generateToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    
    res.status(200).json({ message: 'Logged out successfully' })
})

export {
    registerUser,
    authUser,
    logoutUser,
}