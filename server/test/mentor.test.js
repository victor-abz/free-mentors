// Import the dependencies for testing
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';
import mentors from '../models/mentors';
import mocks from './mocks/mocks';
// Configure chai
chai.use(chaiHttp);
let token = null;

const router = () => chai.request(app);
let mentorId = null;

describe('Mentor test', () => {
  beforeEach(() => {
    const allMentors = mentors.findMentors();
    mentorId = allMentors[0].mentorId;
  });
  it('should login a user', () => {
    router()
      .post('/api/v1/auth/login')
      .send(mocks.testLogin)
      .end((error, response) => {
        token = response.body.data.token;
      });
  });
  it('should get list of mentors', (done) => {
    router()
      .get('/api/v1/mentors')
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('should get one mentor', (done) => {
    router()
      .get(`/api/v1/mentors/${mentorId}`)
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');

        done(error);
      });
  });
  it('Should return mentor not found', (done) => {
    router()
      .get('/api/v1/mentors/12345')
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');

        done(error);
      });
  });
});
