/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */
/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randToken from 'rand-token';
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
            // const refresh = signToken({ id: readEmail.id }, process.env.REFRESH_LIFE);
            const refresh = randToken.generate(30);
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

const refreshToken = async (req, res) => {
  try {
    const decode = jwt.verify(req.headers.token, process.env.SECRET_KEY,
      { ignoreExpiration: true });
    const read = await findOneUser({ _id: decode.id });
    if (read) {
      if (read.refreshToken === req.body.refreshToken) {
        const refresh = randToken.generate(30);
        const token = jwt.sign(
          { id: read._id }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_LIFE },
        );
        await putUser({ _id: read._id }, { refreshToken: refresh });
        res.json(login(token, refresh));
      } else {
        res.status(code.badRequestNumb).json(fail('Refresh Token is not valid', 'Bad Request', code.badRequestCode, code.badRequestNumb));
      }
    } else {
      res.status(code.badRequestNumb).json(fail('Access Token is not valid', 'Bad Request', code.badRequestCode, code.badRequestNumb));
    }
  } catch (error) {
    res.json(fail(error.message));
  }
};

export { signin, refreshToken };
