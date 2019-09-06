import express from 'express';
import checkData from '../middleware/checkData';

import userAuthController from '../controllers/userAuthController';

const users = express.Router();

users.get('/', checkData.verifyToken, userAuthController.getUsers);

users.patch('/:userId', checkData.verifyToken, userAuthController.changeToMentor);


export default users;
