// src/usingDB/controllers/Helper.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helper = {
  // Hash Password
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },
  // Compare password
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },

  // Generate token
  generateToken(data) {
    const token = jwt.sign(data, 'free-mentors', { expiresIn: '7d' }
    );
    return token;
  },

  findObjectByProp(arr, prop, val) {
    return arr.find(obj => obj[prop] === val);
  },

  filterObjectByProp(arr, prop, val) {
    return arr.filter(obj => obj[prop] === val);
  },
  // Handle on Success Responses
  handleSuccess(res, status, message, data) {
    if (message === 'undefined') {
      return res.status(status).json({
        status: status,
        data
      })
    }

    return res.status(status).json({
      status: status,
      message: message,
      data
    })
  },
  // Handle on Error Responses
  handleError(res, status, error) {
    return res.status(status).json({
      status: status,
      error: error,
    })
  },
  // Get user role
  getRole(role) {
    let roleId = '';
    switch (role) {
      case 'admin': roleId = 'admin'; break;
      case 'mentor': roleId = 'mentorId'; break;
      case 'user': roleId = 'menteeId'; break
      default: break;
    }
    return roleId;
  }
}


export default Helper;