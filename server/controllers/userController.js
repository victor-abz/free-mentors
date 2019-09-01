import userModel from '../models/users';
import Helper from '../helpers/helper';

const userController = {

  // Create Data Function
  createUser: (req, res) => {
    const user = userModel.createUser(req.body);

    if (user === 'Email exists') {
      return res.status(400).json({
        status: 400,
        error: 'Email already exists',
      });
    } if (user === 'Some values are missing') {
      return res.status(400).json({
        status: 400,
        error: 'Some values are missing',
      });
    } if (user === 'Please enter a valid email address') {
      return res.status(400).json({
        status: 400,
        error: 'Please enter a valid email address',
      });
    }
    const token = Helper.generateToken(user);
    return res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: {
        token,
        message: 'User created successfully',
      },
    });
  },
  // Login User
  loginUser(req, res) {
    const user = userModel.loginUser(req.body);
    if (user === 'Some values are missing') {
      return res.status(400).json({
        status: 400,
        error: 'Some values are missing',
      });
    } if (user === 'Please enter a valid email address') {
      return res.status(400).json({
        status: 400,
        error: 'Please enter a valid email address',
      });
    } if (user === 'The Email you provided is incorrect') {
      return res.status(400).json({
        status: 400,
        error: 'The Email you provided is incorrect',
      });
    }
    if (user === 'The credentials you provided is incorrect') {
      return res.status(400).json({
        status: 400,
        error: 'The credentials you provided is incorrect',
      });
    }

    const token = Helper.generateToken(user);
    return res.status(200).json({
      status: 200,
      message: 'Succesfully logged in',
      data: {
        token,
      },
    });
  },


  // Getting All data
  getUsers: (req, res) => {
    const users = userModel.findUsers();
    return res.status(200).json({
      message: 'Found all users',
      data: users,
    });
  },

  // Getting one item
  getUser: (req, res) => {
    const user = userModel.findUser(req.params.userId);
    if (!user) {
      return res.status(404).json({
        message: 'user not found',
      });
    }
    return res.status(200).json({
      message: 'Found...',
      user,
    });
  },

  // Updating Data
  changeUserRole: (req, res) => {
    const user = userModel.findUser(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    const updatedUser = ReflectionModel.updateUser(req.params.id, req.body);
    return res.status(200).json({
      data: updatedUser,
      message: 'User account changed to mentor',
    });
  },

  // Deleting Data
  deleteUser: (req, res) => {
    const user = userModel.findUser(req.params.userId);
    if (!user) {
      return res.status(404).send({ message: 'user not found' });
    }
    return res.status(200).json({
      message: `Succesfully Deleted ID ${req.params.userId}`,

    });
  },
};

export default userController;
