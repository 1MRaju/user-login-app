const express = require('express');
const { registerUser, loginUser, getUserDetails, deleteUser } = require('../controllers/userController');
const router = express.Router();

//user register route
router.post('/register', registerUser);

//user login route
router.post('/login', loginUser);

//user details route
router.get('/allusers', getUserDetails);

//user delete route
router.delete('/:id', deleteUser);

module.exports = router;