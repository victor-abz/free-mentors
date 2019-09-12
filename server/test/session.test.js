// Import the dependencies for testing
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import Db from '../db/';
import setupdb from './mocks/create.mocks'

import app from '../../app';
import sessions from '../models/sessions';
import mocks from './mocks/mocks';
import dbmock from './mocks/db.mocks'
// Configure chai
chai.use(chaiHttp);

const router = () => chai.request(app);
let token = null;
let adminToken = null;
let sessionId = null;

describe('Review', () => {
  
  beforeEach(async () => {
    await setupdb.dropAll()
    await setupdb.databaseData();
    const allSessions = await new Db().findAll('sessions');
    sessionId = allSessions[0].sessionid;
  });
  
  it('should login a user', (done) => {
    router()
      .post('/api/v1/auth/login')
      .send(dbmock.userlogin)
      .end((error, response) => {
        token = response.body.data;
        done(error)
      });
  });
  it('should create session', (done) => {
    router()
      .post('/api/v1/sessions')
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
      .get('/api/v1/sessions')
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('should login an admin', (done) => {
    router()
      .post('/api/v1/auth/login')
      .send(dbmock.adminlogin)
      .end((error, response) => {
        adminToken = response.body.data;
        done(error)
      });
  });
  it('Should reject session', (done) => {
    router()
      .patch(`/api/v1/sessions/${sessionId}/reject`)
      .set('token', token)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');

        done(error);
      });
  });

});
