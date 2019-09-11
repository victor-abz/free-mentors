import express from 'express';
import checkData from '../middleware/checkData';
import schema from '../middleware/schema'

import userAuthController from '../controllers/userAuthController';

const users = express.Router();

users.get('/', checkData.verifyToken, userAuthController.getUsers);

users.patch('/:userId',checkData.validate(schema.userParams, 'params'), checkData.doesExist, checkData.verifyToken, userAuthController.changeToMentor);


export default users;
