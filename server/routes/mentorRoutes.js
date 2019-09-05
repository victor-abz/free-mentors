import express from 'express';
import checkData from '../middleware/checkData';
import mentorController from '../controllers/mentorController';

const mentor = express.Router();

mentor.get('/', mentorController.getMentors);
mentor.get('/:mentorId', mentorController.getMentor);

// mentor.get('/:mentorId',checkData.isMentor, mentorController.getMentor);

// // Mentor Routes
// mentor.get('/', mentorController.getMentors);
// mentor.get('/:mentorId', checkData.isMentor, mentorController.getMentor);


export default mentor;
