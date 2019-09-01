import sessionModel from '../models/sessions';

const sessionController = {
// Creating Session
  createSessions: (req, res) => {
    if (!req.body.questions && !req.body.mentorId) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    //  console.log(req.userData);
    const data = sessionModel.createSession(req.body, req.userData);
    return res.status(201).json({
      status: 200,
      data,
    });
  },
  // Getting All data
  getSessions: (req, res) => {
    const data = sessionModel.findSessions();
    return res.status(200).json({
      status: 200,
      data,
    });
  },

  // Getting one mentor
  getSession: (req, res) => {
    const data = sessionModel.findSession(req.params.sessionId);
    if (!data) {
      return res.status(404).json({
        message: 'No Session found',
      });
    }
    return res.status(200).json({
      status: 200,
      data,
    });
  },
  // Updating Data
  acceptSession: (req, res) => {
    const session = sessionModel.findSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'session not found' });
    }
    const data = sessionModel.acceptSession(req.params.sessionId);
    return res.status(200).json({
      status: 200,
      data,
    });
  },
  //
  rejectSession: (req, res) => {
    const session = sessionModel.findSession(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'session not found' });
    }
    const data = sessionModel.rejectSession(req.params.sessionId);
    return res.status(200).json({
      message: 'Session Rejected',
      data,
    });
  },

};


export default sessionController;
