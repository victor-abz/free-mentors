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
    const { userId, role } = req.userData;
    const data = await new Db().findByProp('sessions', 'menteeId', userId);
    if (role === 'admin') {
      const allSessions = await new Db().findAll('sessions');
      return Helper.handleSuccess(res, 200, 'All Sessions', allSessions);
    }
    return Helper.handleSuccess(res, 200, 'Your sessions', data);
  },

  acceptSession: (req, res) => {
    sessionModel.changeStatus('Accepted', req.params.sessionId, res);
  },

  rejectSession: (req, res) => {
    sessionModel.changeStatus('Rejected', req.params.sessionId, res);
  },
  
  createReview: (req, res) => reviewModel.createReview(req.body, req.params.sessionId, req.userData, res),

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
