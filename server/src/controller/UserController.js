const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helper/HashPass');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();
        if (savedUser) {
            return res.status(200).json({
                message: "User created successfully",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred",
        });
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                message: "User does not exist",
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json(

            {
                token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred",
        });
    }
};