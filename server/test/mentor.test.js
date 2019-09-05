// Import the dependencies for testing
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import  chai  from 'chai';
import app from '../../app';
import mentors from '../models/mentors';
// Configure chai
chai.use(chaiHttp);

const router = () => chai.request(app);
let mentorId = null;

describe('Session test', () => {
    beforeEach(()=>{
        const allMentors = mentors.findMentors();
        mentorId=allMentors[0].mentorId;
    })
  it('should get list of mentors', (done) => {
    router()
      .get('/api/v1/mentors')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('should get one mentor', (done) => {
    router()
      .get(`/api/v1/mentors/${mentorId}`)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
       
        done(error);
      });
  });
  it('Should return mentor not fount', (done) => {
    router()
      .get(`/api/v1/mentors/12345`)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
       
        done(error);
      });
  });
});
