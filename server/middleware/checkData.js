// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// import mentorModel from '../models/mentors';
// import userModel from '../models/userAuth';
import Helper from '../helpers/helper';
// import url from 'url'
// import sessionModel from '../models/sessions'
import db from '../db'

const checkData = {
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


  async userExist(req, res, next) {
    // const allUsers = userModel.findUsers();
    // const userExist = Helper.findObjectByProp(allUsers, 'email', req.body.email)

    const userExist = await new db().findUsers('users','email', req.body.email);
		// if(result.rows[0].count === '0'){
		// 	await this.addUser(new User('admin@freementors.com', 'Admin', 'Super', '$2b$08$GJqUT02XgD.4JEyQzIF2zufHCGRpbJrWwZhXBdSQBVTRYp9L3qb2q', 'Kigali -Rwanda', 'Nyarugenege', 'Node Js', '5 years', 'Admin'));
		// }


    if(req.path == '/auth/login' && userExist.rows[0].count !== '0'){
     return next();
    }
    if(req.path === '/auth/signup'){
      if(userExist.rows[0].count !== '0'){
        const status = 400;
        const error = 'User Exist';
        return Helper.handleError(res, status, error);
      }
        return next();
      
    }
    const status = 400;
    const error = 'User not Found, Please Signup';
    return Helper.handleError(res, status, error);
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
  checkInput: (req, res, next) => {    
    if (!req.body.email || !req.body.password) {
      const status = 400;
      const error = 'Some Values are missing';
      return Helper.handleError(res, status, error);
    } 
    next();
  },

}


export default checkData;