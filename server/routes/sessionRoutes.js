import express from 'express';
import checkData from '../middleware/checkData';
import sessionController from '../controllers/sessionController';
import schema from '../middleware/schema'

const session = express.Router();

// Sessions Routes
session.post('/',checkData.validate(schema.postSession, 'body'), checkData.verifyToken, sessionController.createSessions);
session.get('/', checkData.verifyToken, sessionController.getSessions);
session.patch('/:sessionId/accept',checkData.validate(schema.sessParams, 'params'), checkData.verifyToken,  sessionController.acceptSession);
session.patch('/:sessionId/reject',checkData.validate(schema.sessParams, 'params'), checkData.verifyToken, sessionController.rejectSession);
session.post('/:sessionId/review',checkData.validate(schema.sessParams, 'params'), checkData.verifyToken,  sessionController.createReview);
session.delete('/:sessionId/review',checkData.validate(schema.sessParams, 'params'), checkData.verifyToken, sessionController.deleteReview);

export default session;
