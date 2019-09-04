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
        sessionId: 2,
        mentorId: 3,
        menteeId: 4,
        score: 5,
        menteeFullName: 'Example Name',
        remark: 'You are awesome',
      },
      {
        sessionId: 2,
        mentorId: 5,
        menteeId: 4,
        score: 3,
        menteeFullName: 'Example Name',
        remark: 'Interactive',
      },
    ];
  }

  createReview(data, userData) {
    const newReview = {
      sessionId: 'data.sessionId',
      mentorId: data.mentorId,
      menteeId: userData.userId,
      menteeFullName: `${userData.firstName} ${userData.lastName}`,
      score: data.score,
      remark: data.remark,
    };
    this.reviews.push(newReview);
    return newReview;
  }

  findReview(sessionId) {
    return this.reviews.find((oneSession) => oneSession.sessionId === parseInt(sessionId, 10));
  }

  deleteReview(reviewId) {
    const review = this.findReview(reviewId);
    const index = this.reviews.indexOf(review);
    this.reviews.splice(index, 1);
  }
}
export default new Review();
