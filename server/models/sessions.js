import Helper from '../helpers/helper'
class Session {
  //
  constructor() {
    this.sessions = [
      {
        sessionId: 1,
        mentorId: 2,
        menteeId: 5,
        questions: 'Question to mentor',
        menteeEmail: 'Notnto@freementee.com',
        status: 'pending',
      },
      {
        sessionId: 2,
        mentorId: 2,
        menteeId: 3,
        questions: 'Another for Mentor',
        menteeEmail: 'john@freementee.com',
        status: 'pending',
      },
      {
        sessionId: 2,
        mentorId: 3,
        menteeId: 4,
        questions: 'How to run npm',
        menteeEmail: 'john@freementee.com',
        status: 'pending',
      },
      {
        sessionId: 2,
        mentorId: 5,
        menteeId: 4,
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

 
// Change Status to Accpeted or Rejected
  changeStatus(changeTo,data, res) {
    
    const allSession = this.findSessions();
    const sessionExist = Helper.findObjectByProp(allSession, 'sessionId', parseInt(data,10))

    const index = this.sessions.indexOf(sessionExist);
    this.sessions[index].status = changeTo;
    const result = this.sessions[index];
    
    const status = 200;
    const message = `Session is now ${changeTo}`;

    return Helper.handleSuccess(res, status,message, result);
  }


  // Find session
  findSessions() {
    return this.sessions;
  }
}
export default new Session();
