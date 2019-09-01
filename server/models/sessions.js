class Session {
  //
  constructor() {
    this.sessions = [
      {
        sessionId: 1,
        mentorId: 2,
        menteeId: 3,
        questions: 'How to run npm',
        menteeEmail: 'john@freementee.com',
        status: 'pending',
      },
      {
        sessionId: 2,
        mentorId: 2,
        menteeId: 3,
        questions: 'How to run npm',
        menteeEmail: 'john@freementee.com',
        status: 'pending',
      },
    ];
  }

  // Create a Session
  createSession(data, userData) {
    const newSession = {
      sessionId: this.sessions.length + 1,
      mentorId: data.mentorId,
      menteeId: userData.userId,
      questions: data.questions,
      menteeEmail: userData.email,
      status: 'pending',
    };
    this.sessions.push(newSession);
    return newSession;
  }

  // Function to find one mentor
  findSession(sessionId) {
    return this.sessions.find((oneSession) => oneSession.sessionId === parseInt(sessionId, 10));
  }

  acceptSession(sessionId) {
    const session = this.findSession(sessionId);
    const index = this.sessions.indexOf(session);
    this.sessions[index].status = 'Accepted';
    return this.sessions[index];
  }

  rejectSession(sessionId) {
    const session = this.findSession(sessionId);
    const index = this.sessions.indexOf(session);
    this.sessions[index].status = 'Rejected';
    return this.sessions[index];
  }


  //
  findSessions() {
    return this.sessions;
  }
}
export default new Session();
