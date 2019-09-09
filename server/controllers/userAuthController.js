// import userModel from '../models/userAuth';
import Helper from '../helpers/helper';
import Db from '../db';

const userAuthController = {
  createUser: (req, res) => new Db().addUser(req.body, res),
  // Login User
  loginUser: (req, res) => {
    new Db().loginUser(req.body, res);
  },
  // Updating Data
  changeToMentor: (req, res) => new Db().changeToMentor('mentor', req.params.userId, res),

  // Getting All Users
  getUsers: (req, res) => {
    if (req.userData.role === 'admin') {
      const result = new Db().findAll('users', res);
      return result;
    }
    return Helper.handleError(res, 401, 'Insufficient provilege. Please sign in');
  },
};

export default userAuthController;
