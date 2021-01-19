/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';

import { unAuthorizeNumb } from '../constant/code';
import { fail } from '../helpers/response';
import { user } from '../models/manage/userModel';
import * as code from '../constant/code';

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const authen = await user.findOne({ _id: decode.id });
    if (authen) {
      next();
    } else {
      res.json('dang nhap sai');
    }
  } catch (error) {
    if (error.message === 'jwt must be provided') {
      res.json(fail(
        'you not login yet', 'unAuthorize', 'unAuthorize', unAuthorizeNumb,
      ));
    } else if (error.message === 'jwt expired') {
      res.json(fail(
        'your login is out of date', 'unAuthorize', 'unAuthorize', unAuthorizeNumb,
      ));
    } else {
      res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    }
  }
};

export { authenticate };
