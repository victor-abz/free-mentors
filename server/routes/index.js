import express from 'express';
import Helper from '../helpers/helper';

import userAuthController from '../controllers/userAuthController';
import mentorController from '../controllers/mentorController';
import sessionController from '../controllers/sessionController';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Free Mentors',
}));

// Mentor Routes
router.post('/auth/signup', userAuthController.createUser);
router.post('/auth/login', userAuthController.loginUser);

// Mentor Routes
router.get('/mentors', mentorController.getMentors);
router.get('/mentors/:mentorId', mentorController.getMentor);

// Sessions Routes
router.post('/sessions', Helper.verifyToken, sessionController.createSessions);
router.get('/sessions', Helper.verifyToken, sessionController.getSessions);
router.patch('/sessions/:sessionId/accept', sessionController.acceptSession);
router.patch('/sessions/:sessionId/reject', sessionController.rejectSession);
router.post('/sessions/:sessionId/review', Helper.verifyToken, sessionController.createReview);
router.delete('/sessions/:sessionId/review', Helper.verifyToken, sessionController.deleteReview);

router.get('/users', userAuthController.getUsers);
router.get('/users/:userId', userAuthController.getUser);

router.patch('/user/:userId', userAuthController.changeToMentor);

export default router;
