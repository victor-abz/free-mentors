import express from 'express';
import checkData from '../middleware/checkData';

import userAuthController from '../controllers/userAuthController';

const users = express.Router();

users.get('/', userAuthController.getUsers);
// users.get('/:userId', userAuthController.getUser);
users.patch('/:userId', userAuthController.changeToMentor);

// users.get('/users', userAuthController.getUsers);

// users.patch('/user/:userId', checkData.doIdExist, userAuthController.changeToMentor);

export default users;