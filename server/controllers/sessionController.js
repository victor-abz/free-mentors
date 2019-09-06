import sessionModel from '../models/sessions';
import reviewModel from '../models/review';
import Helper from '../helpers/helper';

const sessionController = {
  // Creating Session
  createSessions: (req, res) => {
    const data = sessionModel.createSession(req.body, req.userData);
    const status = 201;
    const message = 'Session request was sent, waiting mentor approval';
    return Helper.handleSuccess(res, status, message, data);
  },
  // Getting All data
  getSessions: (req, res) => {
    const roles = ['user', 'mentor', 'admin'];
    const userRole = Helper.getRole(req.userData.role);

    if (roles.indexOf(req.userData.role) === -1) {
      const status = 401;
      const error = 'Insufficient provilege. Please sign in';
      return Helper.handleError(res, status, error);
    }
    const allSessions = sessionModel.findSessions();
    const userSessions = Helper.filterObjectByProp(allSessions, userRole, req.userData.userId);
    if (req.userData.role === 'admin') {
      const status = 200;
      const message = 'undefined';
      return Helper.handleSuccess(res, status, message, allSessions);
    }

    const status = 200;
    const message = 'undefined';
    return Helper.handleSuccess(res, status, message, userSessions);
  },


  // Accept Session
  acceptSession: (req, res) => {
    sessionModel.changeStatus('Accepted', req.params.sessionId, res);
  },
  // Reject Session
  rejectSession: (req, res) => {
    sessionModel.changeStatus('Rejected', req.params.sessionId, res);
  },

  createReview: (req, res) => {
    return reviewModel.createReview(req.body, req.params.sessionId, req.userData, res);
  },

  // Deleting Data
  deleteReview: (req, res) => {
    if (req.userData.role === 'admin') {
      return reviewModel.deleteReview(req.params.sessionId, res);
    }
    const status = 401;
    const error = 'You are not allowed to change status';
    return Helper.handleError(res, status, error);
  },

};


export default sessionController;
