// Import the dependencies for testing
import chaiHttp from 'chai-http';
import { expect } from 'chai';
import  chai  from 'chai';
import app from '../../app';
// Configure chai
chai.use(chaiHttp);

const router = () => chai.request(app);
const testUser = {
    "firstName": "menthee", 
    "lastName": "tester",
    "email": "menteh@freementors.com",
    "password": "mentor",
    "address": "Kigali-Rwanda",
    "bio": "EveryThing",
    "occupation": "Developer",
    "expertise": "Googling, Node Js, Javascript, SQL"
};
const testLogin = {
    "email": "menteh@freementors.com",
    "password": "mentor",
};

describe('User Authorization', () => {
  it('should sign up a user', (done) => {
    router()
      .post('/api/v1/auth/signup')
      .send(testUser)
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
      .send(testLogin)
      .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body).to.be.a('object');
        expect(response.body).to.have.property('message').that.contain('User is successfully logged in');
        expect(response.body.data).to.be.an('object');
        expect(response.body.data).that.contain.property('token');
        done(error);
      });
  });
});
