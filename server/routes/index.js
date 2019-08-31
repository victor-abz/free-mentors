import express from 'express';

import userAuthController from '../controllers/userAuthController';
// import userController from '../controllers/userController';
import mentorController from '../controllers/mentorController';
import sessionController from '../controllers/sessionController';

const router = express.Router();

router.post('/auth/signup', userAuthController.createUser);
router.post('/auth/login', userAuthController.loginUser);
// routes.get('/users', userController.getUsers);
// routes.get('/users/:userId', userController.getUser);
// routes.patch('/user/:userId', userController.changeUserRole);
// routes.delete('/users/:userId', userController.deleteUser);
// Mentor Routes
router.get('/mentors', mentorController.getMentors);
router.get('/mentors/:mentorId', mentorController.getMentor);

// Sessions Routes
router.post('/sessions', sessionController.createSessions);
router.get('/sessions', sessionController.getSessions);

// Additions Ends Here

export default router;

