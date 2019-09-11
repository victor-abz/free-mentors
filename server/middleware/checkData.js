import jwt from 'jsonwebtoken';
import Helper from '../helpers/helper';
import Db from '../db'
import Joi from '@hapi/joi'

const checkData = {
  validate : (schema, property) => { 
    return (req, res, next) => { 
      const { error } = Joi.validate(req[property], schema);
      const valid = error == null; 
  
    if (valid) { 
      next(); 
    } else { 
      const { details } = error; 
      const message = details.map(i => i.message).join(',');  
      console.log("error", message); 
     res.status(400).json({ error: message }) } 
    } 
  }, 

  async userExist(req, res, next) {
    const  rows = await new Db().findByProp('users', 'email', req.body.email)  
    const {0: userExist} = rows
    if(req.path == '/auth/login' && userExist !== '0'){
     return next();
    }
    if(req.path === '/auth/signup'){
      if(userExist){
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
      req.userData = decoded;
      next();
    })
  },
}


export default checkData;