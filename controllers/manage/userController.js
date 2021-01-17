/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import bcrypt from 'bcrypt';
import {
  addUser, findUser, findOneUser, putUser, delUser,
} from '../../services/manage/userService.js';
import { success, fail } from '../../helpers/response.js';
import * as code from '../../constant/code.js';

const createUser = async (req, res) => {
  try {
    const create = await addUser(req.body);
    res.json(success('post', 'user', create));
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
  }
};

const readUser = async (req, res) => {
  try {
    const read = await findUser(req.query);
    if (read.length < 1) {
      res.json(success('get', 'user', code.noValidFound));
    }
    res.json(success('get', 'user', read));
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readOneUser = async (req, res) => {
  try {
    const readOne = await findOneUser(req.params.id);
    if (!readOne) {
      res.json(success('get', 'user', code.noValidFound));
    } else {
      res.json(success('get', 'user', readOne));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateUser = async (req, res) => {
  try {
    const body = req.body;
    if (body.password) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, async (_err, hash) => {
          body.password = hash;
          try {
            const update = await putUser({ _id: req.params.id }, body);
            if (update == null) {
              res.json(fail(
                code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
              ));
            } else {
              res.json(success('put', 'user', update));
            }
          } catch (error) {
            res.status(code.badRequestNumb)
              .json(
                fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
              );
          }
        });
      });
    } else {
      try {
        const update = await putUser({ _id: req.params.id }, body);
        if (update == null) {
          res.json(fail(
            code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
          ));
        } else {
          res.json(success('put', 'user', update));
        }
      } catch (error) {
        res.status(code.badRequestNumb)
          .json(
            fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
          );
      }
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const deleteUser = async (req, res) => {
  try {
    const remove = await delUser(req.params.id);
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('delete', 'user', remove));
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createUser, readOneUser, readUser, updateUser, deleteUser,
};
