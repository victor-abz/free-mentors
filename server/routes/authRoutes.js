import express from 'express';
import checkData from '../middleware/checkData';
import userAuthController from '../controllers/userAuthController';

const userAuth = express.Router();

userAuth.post('/auth/signup', checkData.checkDetails, checkData.isValidEmail, userAuthController.createUser);
userAuth.post('/auth/login',checkData.checkDetails, checkData.isValidEmail,  userAuthController.loginUser);

// Mentor Routes
// userAuth.post('/auth/signup', checkData.checkDetails, checkData.isValidEmail, checkData.doUserExist, userAuthController.createUser);
// userAuth.post('/auth/login', checkData.checkDetails, checkData.isValidEmail, checkData.doesEmailExist, checkData.comparePassword, userAuthController.loginUser);


export default userAuth;
