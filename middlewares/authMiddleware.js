const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = process.env.JWT_SECRET;

const authMiddleware = async (req,res,next) => {
    const token = req.header('Authorization');
    if(!token){
        return   res.status(401).send("Access denied. No token provided.");
    }

    try {
       //verify token
       const decoded = jwt.verify(token, secretKey);

       //to check already a user or not
       const user = await User.findById(decoded.userId);

       if(!user){
        return   res.status(401).send("Invalid token");
       }

       req.user = user;
       next();

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "Invalid Token",
        })
    }
}

module.exports = authMiddleware;