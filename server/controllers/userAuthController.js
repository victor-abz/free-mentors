import userModel from '../models/userAuth';
import Helper from '../helpers/helper';
// import myTest from '../../myfile';

const userAuthController = {
  createUser: (req, res) => {
    userModel.createUser(req.body, res);
  },
  // Login User
  loginUser(req, res) {
    userModel.loginUser(req.body, res)
  },
  // Updating Data
  changeToMentor: (req, res) => {
    userModel.changeToMentor(req.params.userId, res)

  },

  // Getting All Users
  getUsers: (req, res) => {
    const users = userModel.findUsers();
    status = 200;
    message = 'All Users Fetched'
    return Helper.handleSuccess(res, status,'undefined', users);
  }
};

export default userAuthController;
