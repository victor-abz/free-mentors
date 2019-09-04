import sessionModel from '../models/sessions';
import reviewModel from '../models/review';

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
    const { userData } = req;
    if (req.userData.role === 'user') {
      const data = sessionModel.findUserRequests(userData.userId);
      return res.status(200).json({
        status: 200,
        data,
      });
    }
    if (req.userData.role === 'mentor') {
      const data = sessionModel.findMentorRequests(userData.userId);
      return res.status(200).json({
        status: 200,
        data,
      });
    }

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

  createReview: (req, res) => {
    const score = parseInt(req.body.score, 10);

    if (!score) {
      return res.status(400).json({ message: 'Score is required' });
    }
    if (score > 0 && score <= 5) {
      const session = sessionModel.findSession(req.params.sessionId);

      if (!session) {
        return res.status(404).json({ message: 'session not found' });
      }

      const data = reviewModel.createReview(req.body, req.userData);
      return res.status(201).json({
        status: 201,
        data,
      });
    }
    return res.status(400).json({
      status: 400,
      message: 'A score should be between 0 and 5',
    });
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
