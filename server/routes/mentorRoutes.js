import express from 'express';
import checkData from '../middleware/checkData';
import mentorController from '../controllers/mentorController';

const mentor = express.Router();

mentor.get('/', checkData.verifyToken, mentorController.getMentors);
mentor.get('/:mentorId', checkData.verifyToken, mentorController.getMentor);


export default mentor;
