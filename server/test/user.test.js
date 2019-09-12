// Import the dependencies for testing
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

import app from '../../app';
import dbmock from './mocks/db.mocks'
chai.use(chaiHttp);
let token = null;

const router = () => chai.request(app);

describe('User Authorization', () => {
  it('should sign up a user', (done) => {
    router()
      .post('/api/v1/auth/signup')
      .send(dbmock.signup)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message').that.contain('User created successfully');
        expect(response.body.data).to.be.an('object');
        expect(response.body.data).that.contain.property('token');
        expect(response.body.data).that.contain.property('message');
        done(error);
      });
  });
  it('should login a user', (done) => {
    router()
      .post('/api/v1/auth/login')
      .send(dbmock.userlogin)
      .end((error, response) => {
        token = response.body.data;
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
});
