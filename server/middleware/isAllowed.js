import jwt from 'jsonwebtoken';

const isValid = (req, res, next) => {
    const { token } = req.headers;
    
    console.log(token, 'is role allowed');
    next();
}
export default isValid