// Import the dependencies for testing
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import  chai  from 'chai';
import app from '../../app';
import mocks from './mocks/mocks'
// Configure chai
chai.use(chaiHttp);

const router = () => chai.request(app);

describe('User Authorization', () => {
  it('should sign up a user', (done) => {
    router()
      .post('/api/v1/auth/signup')
      .send(mocks.testSignUp)
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
      .send(mocks.testLogin)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message').that.contain('User is successfully logged in');
        expect(response.body.data).to.be.an('object');
        expect(response.body.data).that.contain.property('token');
        done(error);
      });
  });
  it('Should get all users', (done) => {
    router()
      .get('/api/v1/users')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
  it('Should change user to a mentor', (done) => {
    router()
      .patch('/api/v1/users/1')
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        done(error);
      });
  });
});
