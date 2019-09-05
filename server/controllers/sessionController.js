import sessionModel from '../models/sessions';
import reviewModel from '../models/review';
import Helper from '../helpers/helper';

const sessionController = {
// Creating Session
  createSessions: (req, res) => {  
    const data = sessionModel.createSession(req.body, req.userData);
    const status = 201;
    const message = 'undefined';
    return Helper.handleSuccess(res, status, message, data);
  },
  // Getting All data
  getSessions: (req, res) => { // Middleware for Checking Role Needed    
    if (req.userData.role === 'user') {
      const role = 'menteeId'
      const allSessions = sessionModel.findSessions();
      const sessionExist = Helper.filterObjectByProp(allSessions, role , req.userData.userId)
      console.log(sessionExist)

      const status = 200;
      const message = 'undefined';
      return Helper.handleSuccess(res, status, message, sessionExist);
    }
    if (req.userData.role === 'mentor') {
      const role = 'mentorId'
      const allSessions = sessionModel.findSessions();
      const sessionExist = Helper.filterObjectByProp(allSessions, role , req.userData.userId)
      console.log(sessionExist)

      const status = 200;
      const message = 'undefined';
      return Helper.handleSuccess(res, status, message, sessionExist);
    }

    if (req.userData.role === 'Admin') {
      const allSessions = sessionModel.findSessions();
      const status = 200;
      const message = 'undefined';
      return Helper.handleSuccess(res, status, message, allSessions);
    }
    const status = 401;
    const error = 'Insufficient provilege. Please sign in';
    return Helper.handleError(res, status, error);

    
  },


  // Acceppt Session
  acceptSession: (req, res) => {
    sessionModel.changeStatus('Accepted', req.params.sessionId, res);
  },
  // Reject Session
  rejectSession: (req, res) => {
    sessionModel.changeStatus('Rejected', req.params.sessionId, res);
  },

  createReview: (req, res) => {
      const data = reviewModel.createReview(req.body, req.params.sessionId, req.userData);
      const status = 201;
      const message = 'undefined';
      return Helper.handleSuccess(res, status, message, data);
  },

  // Deleting Data
  deleteReview: (req, res) => {
    const review = reviewModel.findReview(req.params.sessionId);
    if (!review) {
      return res.status(404).send({ message: 'review not found' });
    }
    reviewModel.deleteReview(req.params.sessionId);
    return res.status(200).json({
      status: 200,
      data: {
        message: 'Review successfully deleted',
      },
    });
  },

};


export default sessionController;
