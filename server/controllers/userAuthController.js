import Helper from '../helpers/helper';
import Db from '../db';

const userAuthController = {
  createUser: async (req, res) => {
    const results = await new Db().addUser(req.body)
    const {0: user} = results
    const token = Helper.generateToken(user);
    const data = {message: 'User created successfully', token: token}
    return Helper.handleSuccess(res, 201, 'User created successfully', data);
  },
  loginUser: async (req, res) => {
    const result = await new Db().loginUser(req.body)
    if (result === 'error') {
      return Helper.handleError(res, 400, 'The credentials you provided is incorrect');
    } 
    return Helper.handleSuccess(res, 200, 'User is successfully logged in', result);
  },

  changeToMentor: async (req, res) => {
    if (req.userData.role === 'admin') {
      const result = await new Db().changeToMentor('mentor', req.params.userId)
      if (result === 'mentor') {
        return Helper.handleError(res, 400, 'Already a Mentor');
      }
      const data = {message: 'User account changed to mentor'}
      return Helper.handleSuccess(res, 200, 'Success', data);
    }
    return Helper.handleError(res, 401, 'Insufficient provilege. Please sign in');
  },

  getUsers: async (req, res) => {
    if (req.userData.role === 'admin') {
      const results = await new Db().findAll('users');
      results.forEach(mentor => {
        delete mentor.password
      });
      return Helper.handleSuccess(res, 200, `All Users Fetched`, results);
    }
    return Helper.handleError(res, 401, 'Insufficient provilege. Please sign in');
  },
};

export default userAuthController;
