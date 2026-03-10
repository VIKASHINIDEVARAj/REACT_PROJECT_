import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // 1. User aagave irukkangala nu check panrom
        const userExists = await User.findOne({ email });
        
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Puthusa create panrom
        const user = await User.create({ name, email, password });
        
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name, // React-la "Hi {name}" nu kaata ithu theva
                email: user.email,
                token: generateToken(user._id), // VIP Pass (JWT)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        // 1. Email-a vachi database-la user-a thedurom
        const user = await User.findOne({ email });

        // 2. User irukkaangala, AND password match aagutha nu check panrom
        // (Note: user.matchPassword() ngurathu User model-la namma ezhuthuna function)
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                _id: user._id,
                name: user.name, 
                email: user.email,
                token: generateToken(user._id), // Login aagum pothum token tharanum!
            });
        } else {
            // Password thappu na 401 Unauthorized
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};