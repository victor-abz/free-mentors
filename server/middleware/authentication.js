import jwt from 'jsonwebtoken';

const isValid = (req, res, next) => {
    const { token } = req.headers;

    console.log(token, 'account is valid');
    next();
}
export default isValid