import express from 'express';
import checkData from '../middleware/checkData';
import userAuthController from '../controllers/userAuthController';
import schema from '../middleware/schema'

const userAuth = express.Router();

userAuth.post('/auth/signup',checkData.validate(schema.signUp, 'body'), checkData.userExist, userAuthController.createUser);
userAuth.post('/auth/login', checkData.validate(schema.login, 'body'), checkData.userExist, userAuthController.loginUser);

export default userAuth;
