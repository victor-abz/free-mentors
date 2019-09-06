import express from 'express';
import checkData from '../middleware/checkData';

import userAuthController from '../controllers/userAuthController';

const users = express.Router();

users.get('/', userAuthController.getUsers);

users.patch('/:userId', userAuthController.changeToMentor);


export default users;