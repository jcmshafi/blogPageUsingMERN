const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
require("dotenv").config();


exports.requireSignin = (req,res,next)  => {
    try {
        const decoded = jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(error)
    }
}