import userModel from '../models/userAuth';
import Helper from '../helpers/helper';
// import myTest from '../../myfile';

const userAuthController = {
  createUser: (req, res) => {
    userModel.createUser(req.body, res);
  },
  // Login User
  loginUser(req, res) {
    userModel.loginUser(req.body, res);
  },
  // Updating Data
  changeToMentor: (req, res) => {
    userModel.changeToMentor(req.userData.role, req.params.userId, res);
  },

  // Getting All Users
  getUsers: (req, res) => {
    if (req.userData.role === 'admin') {
      const users = userModel.findUsers();
      const status = 200;
      const message = 'All Users Fetched';
      return Helper.handleSuccess(res, status, message, users);
    }
    const status = 401;
    const error = 'Insufficient provilege. Please sign in';
    return Helper.handleError(res, status, error);
  },
};

export default userAuthController;
