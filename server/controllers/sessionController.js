import sessionModel from '../models/sessions';
import reviewModel from '../models/review';
import Helper from '../helpers/helper';
import Db from '../db';

const sessionController = {
  createSessions: async (req, res) => {
    const {mentorId, questions} = req.body
    const isMentor = await new Db().findByMultipleProp('users', 'userId', mentorId, 'role','mentor')
    if (isMentor.length === 0) {
      return Helper.handleError(res, 400, 'You are not allowed to request to this ID');
    } else { 
      const questionExist = await new Db().findByMultipleProp('sessions','mentorId', mentorId, 'questions',questions)
      if(questionExist.length === 0 ) {
        const data = await new Db().createSession(req.body, req.userData);
        const {0: session} = data
        return Helper.handleSuccess(res, 201, `Session request was sent, waiting mentor approval`, session);  
      }

        return Helper.handleError(res, 400, `You can't send the same question to the same mentor, please rephrase`);
    }
  },
  getSessions: async (req, res) => {
    const { userId, role } = req.userData;
      if (role === 'admin') {
        const allSessions = await new Db().findAll('sessions');
        if(allSessions.length === 0 ) {
          return Helper.handleError(res, 404, 'There are no session yet');
        }
        return Helper.handleSuccess(res, 200, 'All Sessions', allSessions);
      }
      if(role === 'mentor'){
        const data = await new Db().findByProp('sessions', 'mentorId', userId);
        if(data.length === 0 ) {
          return Helper.handleError(res, 404, 'You have no session yet');
        }
        return Helper.handleSuccess(res, 200, 'Your sessions', data);
      }
      const data = await new Db().findByProp('sessions', 'menteeId', userId);
      return Helper.handleSuccess(res, 200, 'Your sessions', data);
    
  },

  changeSessionStatus: async (req, res) => {
    const {userId:reqId, role} = req.userData
    const sessionData = await new Db().findByProp('sessions', 'sessionId', req.params.sessionId)
    const {0: sessionDetails} = sessionData
    const {mentorid} = sessionDetails
    if(role !== 'mentor' || reqId !== mentorid) {
      return Helper.handleError(res, 400, 'You are not allowed to change the status of this session'); 
    } else {
    const isPending = await new Db().findByMultipleProp('sessions', 'sessionid', parseInt(req.params.sessionId), 'status', 'pending');
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
    }
  },
  
  createReview: async (req, res) => {
    const {userId, role} = req.userData
    const data = await new Db().createReview(req.body, req.params.sessionId, req.userData);
    const sessionData = await new Db().findByProp('sessions', 'sessionId', req.params.sessionId)
    const {0 : sessionDetails} = sessionData
    const {menteeid} = sessionDetails
    if (role !== 'user' || menteeid !== userId) {
      return Helper.handleError(res, 400, `You are not allowed to review`);
    } else {
      if(data === 'error') {
        return Helper.handleError(res, 404, 'session not found');
      } if(data === 'reviewed') {
        return Helper.handleError(res, 400, `You can't review again`);
      }
      return Helper.handleSuccess(res, 201, 'Thank you for reviewing. Kudos', data);
    }
  },

  deleteReview: async (req, res) => {
    if(req.userData.role === 'admin') {
      const result = await new Db().deleteReview(req.params.sessionId);
       return Helper.handleSuccess(res, 201, 'Review Succesfully Deleted');
    }
    return Helper.handleError(res, 401, 'Insufficient provilege. Please sign in');
  },

};


export default sessionController;
