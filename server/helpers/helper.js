// src/usingDB/controllers/Helper.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mentors from '../models/mentors';

const Helper = {
  /**
   * Hash Password Method
   * @param {string} password
   * @returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  /**
   * comparePassword
   * @param {string} hashPassword 
   * @param {string} password 
   * @returns {Boolean} return True or False
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail helper method
   * @param {string} email
   * @returns {Boolean} True or False
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * Gnerate Token
   * @param {string} data
   * @returns {string} token
   */
  generateToken(data) {
    const token = jwt.sign( data,'free-mentors', { expiresIn: '7d' }
    );
    return token;
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
      // res.status(200).send(decoded);
      req.userData = decoded;
      next();
    })
  }



  // routes.get('/api/protected', ensureToken, function(req, res) {
  //   jwt.verify(req.token, 'secret_key_goes_here', function(err, data) {
  //     if (err) {
  //       res.sendStatus(403);
  //     } else {
  //       res.json({
  //         description: 'Protected information. Congrats!'
  //       });
  //     }
  //   });
  // }),
  
// verifyToken(req, res, next) {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//       const bearer = bearerHeader.split(" ");
//       const bearerToken = bearer[1];
//       req.token = bearerToken;
//       next();
//     } else {
//       res.sendStatus(403);
//     }
//   }
}


export default Helper;