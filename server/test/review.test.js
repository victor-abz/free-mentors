// Import the dependencies for testing
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';
import sessions from '../models/sessions';
import mocks from './mocks/mocks';
// Configure chai
chai.use(chaiHttp);

const router = () => chai.request(app);
let token = null;
let sessionId = null;

describe('Review', () => {
  beforeEach(() => {
    const allSessions = sessions.findSessions();
    sessionId = allSessions[0].sessionId;
  });
  it('should login a user', () => {
    router()
      .post('/api/v1/auth/login')
      .send(mocks.testLogin)
      .end((error, response) => {
        token = response.body.data.token;
      });
  });
  it('should create Review', (done) => {
    router()
      .post('/api/v1/sessions/3/review')
      .set('token', token)
      .send(mocks.reviewData)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });

  it('should not review session not accepted', (done) => {
    router()
      .post(`/api/v1/sessions/${sessionId}/review`)
      .set('token', token)
      .send(mocks.reviewData)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });

  it('should delete review', (done) => {
    router()
      .delete(`/api/v1/sessions/${sessionId}/review`)
      .set('token', token)
      .send(mocks.reviewData)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });

  it('should not delete unexisting review', (done) => {
    router()
      .delete('/api/v1/sessions/452/review')
      .set('token', token)
      .send(mocks.reviewData)
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  //   it('should get list of sessions', (done) => {
  //     router()
  //       .get('/api/v1/sessions')
  //       .set('token',token)
  //       .end((error, response) => {
  //         expect(response).to.have.status(200);
  //         expect(response.body).to.be.a('object');
  //         done(error);
  //       });
  //   });
  //   it('should accept session', (done) => {

  //     router()
  //       .patch(`/api/v1/sessions/${sessionId}/accept`)
  //       .set('token',token)
  //       .end((error, response) => {
  //         expect(response).to.have.status(200);
  //         expect(response.body).to.be.a('object');

  //         done(error);
  //       });
  //   });
  //   it('Should reject session', (done) => {

  //     router()
  //       .patch(`/api/v1/sessions/${sessionId+1}/reject`)
  //       .set('token',token)
  //       .end((error, response) => {
  //         expect(response).to.have.status(200);
  //         expect(response.body).to.be.a('object');

  //         done(error);
  //       });
  //   });

  //   it('Should not reject session that was accepted reject session', (done) => {

  //     router()
  //       .patch(`/api/v1/sessions/${sessionId}/reject`)
  //       .set('token',token)
  //       .end((error, response) => {
  //         expect(response).to.have.status(401);
  //         expect(response.body).to.be.a('object');

//         done(error);
//       });
//   });
});
