/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import { findOneUser, putUser } from '../../services/manage/userService.js';
import { login, fail } from '../../helpers/response.js';
import { signToken } from '../../helpers/token.js';
import * as code from '../../constant/code.js';

const signin = async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password,
    };
    if (!body.email || !body.password) {
      res.status(400).json({
        status: 400,
        error: 'InvalidLogin',
        message: 'must fill email and password',
      });
    } else {
      const readEmail = await findOneUser({ email: body.email });
      if (readEmail) {
        bcrypt.compare(body.password, readEmail.password, async (_err, result) => {
          if (result) {
            const token = signToken({ id: readEmail.id }, process.env.TOKEN_LIFE);
            const refresh = signToken({ id: readEmail.id }, process.env.REFRESH_LIFE);
            await putUser({ _id: readEmail.id }, { refreshToken: refresh });
            res.json(login(token, refresh));
          } else {
            res.json({
              login: false,
              message: 'wrong email or password',
            });
          }
        });
      }
    }
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

export { signin };
