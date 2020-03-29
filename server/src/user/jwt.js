import jwt from 'jwt-simple';

import config from '../config';

const JWT =  {
  generateToken: (user) => {
    const createdAt = Math.round(Date.now() / 1000);
    const expiredAt = Math.round(Date.now() / 1000 + 7 * 60 * 60 * 24); // in 7 days
    const payload = {
      sub: user.id,
      iat: createdAt,
      exp: expiredAt
    }
    return jwt.encode(payload, config.jwt_secret);
  },
  generateTokenWithEmail: (email) => {
    const createdAt = Math.round(Date.now() / 1000);
    const expiredAt = Math.round(Date.now() / 1000 + 1 * 60 * 60 * 2); // in 2 hours
    const payload = {
      sub: email,
      iat: createdAt,
      exp: expiredAt
    }
    return jwt.encode(payload, config.jwt_secret_email);
  },
  verifyToken: (token, cb) => {
    const decode = jwt.decode(token, config.jwt_secret)
    if (!decode) return cb(new Error('Token is not verified.'));
    cb(null, decode);
  },
  verifyEmailToken: (token, cb) => {
    const decode = jwt.decode(token, config.jwt_secret_email)
    if (!decode) return cb(new Error('Token is not verified.'));
    cb(null, decode.sub);
  },
}

export default JWT;