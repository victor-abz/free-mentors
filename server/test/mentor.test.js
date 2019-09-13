import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import Db from '../db/'

import app from '../../app';
import dbmock from './mocks/db.mocks'
import setupdb from './mocks/create.mocks'

chai.use(chaiHttp);
let token = null;

const router = () => chai.request(app);
let mentorId = null;
let allMentors = null;

describe('Mentor test', () => {
  beforeEach( async() => {
    await setupdb.dropAll()
    await setupdb.databaseData();
    allMentors = await new Db().findByProp('users','role', 'mentor');   
    mentorId = allMentors[0].userid;
  });
  it('should login a user', (done) => {
    router()
      .post('/api/v2/auth/login')
      .send(dbmock.mentorlogin)
      .end((error, response) => {
        token = response.body.data.token;
        done(error)
      });
  });
  it('should get one mentor', (done) => {
    router()
      .get(`/api/v2/mentors/${mentorId}`)
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');

        done(error);
      });
  });
  it('should get list of mentors', (done) => {
    router()
      .get('/api/v2/mentors')
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('Should return mentor not found', (done) => {
    router()
      .get('/api/v2/mentors/12345')
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');

        done(error);
      });
  });
});
