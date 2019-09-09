import Helper from '../helpers/helper';
import sessionModel from './sessions';

class Review {
  //
  constructor() {
    this.reviews = [
      {
        sessionId: 1,
        mentorId: 2,
        menteeId: 3,
        score: 4,
        menteeFullName: 'Example Name',
        remark: 'You are awesome',
      },
      {
        sessionId: 2,
        mentorId: 2,
        menteeId: 3,
        score: 2,
        menteeFullName: 'Example Name',
        remark: 'Do better',
      },
      {
        sessionId: 6,
        mentorId: 3,
        menteeId: 4,
        score: 5,
        menteeFullName: 'Example Name',
        remark: 'You are awesome',
      },
      {
        sessionId: 4,
        mentorId: 5,
        menteeId: 4,
        score: 3,
        menteeFullName: 'Example Name',
        remark: 'Interactive',
      },
    ];
  }

  createReview(review, session, userData, res) {
    const sessionId = parseInt(session);
    const allSessions = sessionModel.findSessions();
    const theSession = Helper.findObjectByProp(allSessions, 'sessionId', parseInt(sessionId, 10));

    const index = sessionModel.sessions.indexOf(theSession);
    const sessionStatus = sessionModel.sessions[index].status;

    const allReviews = this.findReviews();
    const theReview = Helper.findObjectByProp(allReviews, 'sessionId', parseInt(sessionId, 10));


    if (sessionStatus === 'accepted') {
      if (!theReview) {
        const newReview = {
          sessionId,
          mentorId: review.mentorId,
          menteeId: userData.userId,
          menteeFullName: `${userData.firstName} ${userData.lastName}`,
          score: review.score,
          remark: review.remark,
        };
        this.reviews.push(newReview);
        const status = 201;
        const message = 'Thank you for review';
        return Helper.handleSuccess(res, status, message, newReview);
      }
    }
    const status = 400;
    const error = 'Session review not allowed';
    return Helper.handleError(res, status, error);
  }


  findReviews() {
    return this.reviews;
  }

  deleteReview(sessionId, res) {
    const allReviews = this.findReviews();
    const review = Helper.findObjectByProp(allReviews, 'sessionId', parseInt(sessionId, 10));
    if (!review) {
      const status = 400;
      const error = 'Session review not allowed';
      return Helper.handleError(res, status, error);
    }
    const index = this.reviews.indexOf(review);
    this.reviews.splice(index, 1);

    const status = 200;
    const message = 'Review successfully deleted';
    const result = { message: 'Review successfully deleted' };
    return Helper.handleSuccess(res, status, message, result);
  }

}
export default new Review();
