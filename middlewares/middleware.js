/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-unresolved */
import jwt from 'jsonwebtoken';
import { unAuthorizeNumb } from '../constant/code.js';
import { fail } from '../helpers/response.js';
import { user } from '../models/manage/userModel.js';

const authenticate = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const decode = jwt.verify(token, 'vmoprj');
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
      console.log(error);
    }
  }
};

export { authenticate };
