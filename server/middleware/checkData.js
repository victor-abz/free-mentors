import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mentorModel from '../models/mentors';
import userModel from '../models/userAuth';
import Helper from '../helpers/helper';
import sessionModel from '../models/sessions'

const checkData = {

// Compare Passwords
  comparePassword(req, res, next) {
   const  password = req.body.password;
   const user = userModel.findUser('email',req.body.email);
   if (!bcrypt.compareSync(password, user.password)){
    return res.status(400).json({
      status: 400,
      error: 'The credentials you provided is incorrect',
    });
   }
   next();
  },

// Check if Email is Valid
  isValidEmail(req, res, next) {
    if (!(/\S+@\S+\.\S+/.test(req.body.email))) {
          return res.status(400).json({
            status: 400,
            error: 'Please enter a valid email address',
          });
      }
      next();
  },

// Check if the User with the email is existing in our Datastructure
  doesEmailExist(req, res, next) {
    const user = mentorModel.findUser('email', req.body.email);
    if (user === undefined) {
      return res.status(400).json({
        status: 400,
        error: 'The Email you provided is incorrect',
      });
    }
    next();
  },
// Check if a user with that email exists
  doUserExist(req, res, next) {
    const user = userModel.findUser('email', req.body.email);
    if (user !== undefined) {
      return res.status(400).json({
        status: 400,
        error: 'A User with this Email Exists',
      });
    }
    next();
  },
// Check the ID passed in the Params exists
  doIdExist(req, res, next) {
    const user = userModel.findUser('userId', req.body.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  },
// Verify if someone is a mentor
  isMentor(req, res, next) {
    const mentor = mentorModel.findUser('mentorId', req.params.id);
    
    if (!mentor) {
      return res.status(404).json({
        message: 'Mentor not found',
      });
    }
    next();
  },

// Verify token 
  verifyToken(req,res, next) {
    const token = req.headers['token'];
    if(!token) return res.status(401).json({
      message:'Auth Failed'
    });
    jwt.verify(token,'free-mentors', (err, decoded) =>{
      if(err) return res.status(500).send({
        auth: false,
        message: 'failed to authenticate token'
      });
      // res.status(200).send(decoded);
      req.userData = decoded;
      next();
    })
  },
 // Check Required Fields before submit
  requiredFieldSession: (req, res, next) => {
    if (!req.body.questions || !req.body.mentorId) {
      return res.status(400).json({ message: 'All fields are required' })
    }    
    next();
  },
 // Check Required Fields before submit
  checkDetails: (req, res, next) => {    
    if (!req.body.email || !req.body.password) {
      
      return res.status(400).json({
        status: 400,
        error: 'Some values are missing',
      });
    } 
    next();
  },

  // isSessionReviewable: (req, res, next) => {
  //   const allSession = sessionModel.findSessions();
  //   const sessionExist = Helper.findObjectByProp(allSession, 'sessionId', parseInt(req.params.sessionId,10))
  //   if(sessionId === 'undefined')

  // }

}


export default checkData;