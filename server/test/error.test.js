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
    it('Should return error when route not found', () => {
        router()
          .post('/fghjkl')
          .end((error, response) => {
            expect(response).to.have.status(404);
            expect(response.body).to.be.a('object');
          });
      });
});
