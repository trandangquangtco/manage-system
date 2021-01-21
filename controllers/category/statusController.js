/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import {
  addStatus, findOneStatus, findStatus, putStatus, delStatus,
} from '../../services/category/statusService.js';
import { fail, success } from '../../helpers/response.js';
import * as code from '../../constant/code.js';
import { logger } from '../../helpers/logger';

const createStatus = async (req, res) => {
  try {
    const body = req.body;
    const create = await addStatus(body);
    res.json(success('status', 'post', create));
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    logger.error(error.message);
  }
};

const readStatus = async (req, res) => {
  try {
    const read = await findStatus(req.query);
    if (read.length < 1) {
      res.json(success('status', 'get', code.noValidFound));
    } else {
      res.json(success('status', 'get', read));
    }
  } catch (error) {
    logger.error(error.message);
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readOneStatus = async (req, res) => {
  try {
    const readOne = await findOneStatus({ _id: req.params.id });
    if (!readOne) {
      res.json(success('status', 'get', code.noValidFound));
    } else {
      res.json(success('status', 'get', readOne));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    logger.error(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const update = await putStatus({ _id: req.params.id }, req.body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(success('status', 'put', update));
    }
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const deleteStatus = async (req, res) => {
  try {
    const remove = await delStatus({ _id: req.params.id });
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('status', 'delete', remove));
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createStatus, readStatus, readOneStatus, updateStatus, deleteStatus,
};
