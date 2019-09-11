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

  async doesExist(req, res, next) {
     const path = req.originalUrl.replace(/\?.*$/, '');
     console.log(req.route.path)
     console.log(req.baseUrl)
     if(req.baseUrl === '/api/v1/sessions') {
      const sessionData = await new Db().findByProp('sessions', 'sessionId', req.params.sessionId)
      if(sessionData.length === 0) {
        return Helper.handleError(res, 404, 'session not Found');
      } 
      next()
     }
     if(req.baseUrl === '/api/v1/users') {
      const sessionData = await new Db().findByProp('users', 'userId', req.params.userId)
      if(sessionData.length === 0) {
        return Helper.handleError(res, 404, 'The user doesn\'t exist');
      } 
      next()
     }  
     if(req.baseUrl === '/api/v1/mentors') {
      const sessionData = await new Db().findByMultipleProp('users', 'userId', req.params.mentorId, 'role', 'mentor')
      if(sessionData.length === 0) {
        return Helper.handleError(res, 404, 'The user doesn\'t exist');
      } 
      next()
     }           
   }
}


export default checkData;