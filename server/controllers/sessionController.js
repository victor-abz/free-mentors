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

  changeSessionStatus: async (req, res) => {
    const isPending = await new Db().findByMultipleProp('sessions', 'sessionid', req.params.sessionId, 'status', 'pending');
    if (isPending.length === 0) {
      return Helper.handleError(res, 400, 'You are not allowed to change the status of this session');
    } else {
    if (req.path === `/${req.params.sessionId}/accept`){
      const result = await new Db().changeStatus(req.params.sessionId, 'accepted')
      const data = {message: `Session is now Accepted`}
      return Helper.handleSuccess(res, 200, 'Success', data);
    }
    const result = await new Db().changeStatus(req.params.sessionId, 'rejected')
    const data = {message: `Session is now Rejected`}
    return Helper.handleSuccess(res, 200, 'Success', data);
    }   
  },
  
  createReview: async (req, res) => {
    const data = await new Db().createReview(req.body, req.params.sessionId, req.userData);
    if(data === 'error') {
      return Helper.handleError(res, 404, 'session not found');
    } if(data === 'reviewed') {
      return Helper.handleError(res, 400, 'You can\'t review again');
    }
    return Helper.handleSuccess(res, 201, 'Thank you for reviewing. Kudos', data);
  },

  deleteReview: async (req, res) => {
   const result = await new Db().deleteReview(req.params.sessionId);
    return Helper.handleSuccess(res, 201, 'Review Succesfully Deleted');
  },

};


export default sessionController;
