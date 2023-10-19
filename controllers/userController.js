const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const secretKey = process.env.JWT_SECRET;

//Register user
const registerUser = async (req, res) => {
    const {username, email,dateOfBirth, age, city, password} = req.body;
    try {
        const user = new User({username, email,dateOfBirth,age, city, password});
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const token = jwt.sign({userID:user._id}, secretKey,{expiresIn:'1h'});

        return res.status(200).send({
            success: true, 
            message: "User registered successfully",
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "Error occured while user registration"
        }) 
    }
}

//Login user
const loginUser = async (req,res) => {
    const {email, password} = req.body;  
    try {
        const user = await User.findOne({email});
        if(!user){
            return  res.status(401).send("Invalid credentials");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return  res.status(401).send("Invalid credentials");
        }

        const token = jwt.sign({userID:user._id}, secretKey,{expiresIn:'1h'});

        return res.status(200).send({
            success: true, 
            message: "User logins successfully",
            token,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "Error occured while user login"
        }) 
    }
}

// get users 
const getUserDetails = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).send({
            success: true, 
            message: "Users fetched successfully",
            users,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "Error occured while getting users",
        })  
    }
 }

//delete user
const deleteUser = async (req ,res)=> {
    const userID = req.params.id;
    try {
        const user = await User.findByIdAndRemove(userID); 
        if(!user){
            return  res.status(401).send(" user doesn't exists");
        }
        await user.save();
        return res.status(200).send({
            success: true, 
            message: "User Deleted successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message: "Error occured while deleting a user"
        })  
    }
}

module.exports = {registerUser, loginUser, getUserDetails, deleteUser};