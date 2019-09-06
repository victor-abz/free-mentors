// Import the dependencies for testing
import chaiHttp from 'chai-http';

import chai, { expect } from 'chai';


import app from '../../app';
import sessions from '../models/sessions';
// Configure chai
chai.use(chaiHttp);

const router = () => chai.request(app);

describe('Session test', () => {
  it('Should return error when route not found', () => {
    router()
      .post('/fghjkl')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body).to.be.a('object');
      });
  });

});
