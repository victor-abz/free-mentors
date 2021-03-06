import express from 'express';
import checkData from '../middleware/checkData';
import mentorController from '../controllers/mentorController';
import schema from '../middleware/schema'

const mentor = express.Router();

mentor.get('/', checkData.verifyToken, mentorController.getMentors);
mentor.get('/:mentorId',checkData.validate(schema.mentorParams, 'params'), checkData.doesExist, checkData.verifyToken, mentorController.getMentor);

export default mentor;
