import express from 'express';
import checkData from '../middleware/checkData';
import sessionController from '../controllers/sessionController';

const session = express.Router();

// Sessions Routes
session.post('/', checkData.verifyToken, sessionController.createSessions);
session.get('/', checkData.verifyToken, sessionController.getSessions);
session.patch('/:sessionId/accept', checkData.verifyToken, sessionController.acceptSession);
session.patch('/:sessionId/reject', checkData.verifyToken, sessionController.rejectSession);
session.post('/:sessionId/review', checkData.verifyToken, sessionController.createReview);
session.delete('/:sessionId/review', checkData.verifyToken, sessionController.deleteReview);

export default session;
