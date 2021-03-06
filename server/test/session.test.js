import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import Db from '../db/';
import setupdb from './mocks/create.mocks'

import app from '../../app';
import dbmock from './mocks/db.mocks'
chai.use(chaiHttp);

const router = () => chai.request(app);
let token = null;
let adminToken = null;
let sessionId = null;
let mentorToken = null;
describe('Review', () => {
  
  beforeEach(async () => {
    await setupdb.dropAll()
    await setupdb.databaseData();
    const allSessions = await new Db().findAll('sessions');
    sessionId = allSessions[0].sessionid;
  });
  
  it('should login a user', (done) => {
    router()
      .post('/api/v2/auth/login')
      .send(dbmock.userlogin)
      .end((error, response) => {
        token = response.body.data.token;
        done(error)
      });
  });
  it('should create session', (done) => {
    router()
      .post('/api/v2/sessions')
      .set('token', token)
      .send(dbmock.sessionData4)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('should get list of sessions', (done) => {
    router()
      .get('/api/v2/sessions')
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('should login a mentor', (done) => {
    router()
      .post('/api/v2/auth/login')
      .send(dbmock.mentorlogin)
      .end((error, response) => {
        mentorToken = response.body.data.token;
        done(error)
      });
  });
  it('Should reject session', (done) => {
    router()
      .patch(`/api/v2/sessions/${sessionId}/reject`)
      .set('token', mentorToken)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');

        done(error);
      });
  });

});
