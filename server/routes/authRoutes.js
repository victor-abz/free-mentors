import express from 'express';
import checkData from '../middleware/checkData';
import userAuthController from '../controllers/userAuthController';

const userAuth = express.Router();

userAuth.post('/auth/signup', checkData.checkInput, checkData.isValidEmail, checkData.userExist, userAuthController.createUser);
userAuth.post('/auth/login', checkData.checkInput, checkData.isValidEmail,checkData.userExist,  userAuthController.loginUser);

export default userAuth;
