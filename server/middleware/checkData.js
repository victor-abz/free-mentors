import jwt from 'jsonwebtoken';
import Helper from '../helpers/helper';
import Db from '../db'

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
    const  rows = await new Db().findByProp('users', 'email', req.body.email)  
    const {0: userExist} = rows
    if(req.path == '/auth/login' && userExist !== '0'){
     return next();
    }
    if(req.path === '/auth/signup'){
      if(userExist !== '0'){
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