import userModel from '../models/userAuth';
import Helper from '../helpers/helper';

const userAuthController = {

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
      message: 'User is successfully logged in',
      data: {
        token,
      },
    });
  },
};

export default userAuthController;
