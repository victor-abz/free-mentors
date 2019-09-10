import sessionModel from '../models/sessions';
import reviewModel from '../models/review';
import Helper from '../helpers/helper';
import Db from '../db';

const sessionController = {
  createSessions: async (req, res) => {
    const data = await new Db().createSession(req.body, req.userData);
    return Helper.handleSuccess(res, 201, 'Session request was sent, waiting mentor approval', data);
  },
  getSessions: async (req, res) => {

    const {userId, role}  = req.userData
    console.log(role)

    const data = await new Db().findByProp('sessions','menteeId', userId);
    if (role === 'admin') {
      const allSessions = await new Db().findAll('sessions');
      return Helper.handleSuccess(res, 200, 'All Sessions', allSessions);
    }
    return Helper.handleSuccess(res, 200, 'Your sessions', data);
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
