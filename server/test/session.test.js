// Import the dependencies for testing
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import  chai  from 'chai';
import app from '../../app';
import sessions from '../models/sessions';
// Configure chai
chai.use(chaiHttp);

const router = () => chai.request(app);
let token = null;
let sessionId = null;
const testLogin = {
    "email": "mentor@freementors.com",
    "password": "mentor",
};
const sessionData = {
    questions:'sdfs',
    mentorId:12
}

describe('Session test', () => {
    beforeEach(()=>{
        const allSessions = sessions.findSessions();
        sessionId=allSessions[0].sessionId;
    })
    it('should login a user', () => {
        router()
          .post('/api/v1/auth/login')
          .send(testLogin)
          .end((error, response) => {
            token = response.body.data.token;
          });
      });
  it('should create session', (done) => {
    router()
      .post('/api/v1/sessions')
      .set('token',token)
      .send(sessionData)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('should get list of essions', (done) => {
    router()
      .get('/api/v1/sessions')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('should accept session', (done) => {
   
    router()
      .patch(`/api/v1/sessions/${sessionId}/accept`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
       
        done(error);
      });
  });
  it('should reject session', (done) => {
   
    router()
      .patch(`/api/v1/sessions/${sessionId}/reject`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
       
        done(error);
      });
  });
});
