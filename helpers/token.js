/* eslint-disable arrow-body-style */
import jwt from 'jsonwebtoken';

const signToken = (data, time) => {
  return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: time });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

export { signToken, verifyToken };
