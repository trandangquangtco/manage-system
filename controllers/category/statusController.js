/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
import _ from 'lodash';
import joi from 'joi';
import {
  addStatus, findOneStatus, findStatus, putStatus, delStatus,
} from '../../services/category/statusService';
import { fail } from '../../helpers/response';
import * as code from '../../constant/code';
import { logger } from '../../helpers/logger';

const createStatus = async (req, res) => {
  try {
    const body = req.body;
    const input = joi.object({
      customer: joi.string(),
      describe: joi.string(),
      active: joi.boolean(),
      important: joi.number(),
    });
    const condition = input.validate(body);
    if (condition.error) {
      res.status(code.badRequestNumb).json(fail(condition.error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    } else {
      const create = await addStatus(body);
      res.json(create);
    }
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
    logger.error(error.message);
  }
};

const readStatus = async (req, res) => {
  try {
    const input = req.query;
    const query = _.omit(input, ['page', 'limit', 'from', 'to']);
    query.createdAt = { $gte: input.from || '2021-01-01', $lte: input.to || '2021-12-31' };
    if (input.page < 1) {
      input.page = 1;
    }
    const read = await findStatus(
      query, input.limit || 3, parseInt(Math.ceil(input.page)),
    );
    res.json(read);
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
    res.json(readOne);
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
    logger.error(error.message);
  }
};

const updateStatus = async (req, res) => {
  try {
    const body = req.body;
    const input = joi.object({
      projectType: joi.string(),
      describe: joi.any(),
      active: joi.boolean(),
      important: joi.number(),
    });
    const condition = input.validate(body);
    if (condition.error) {
      res.status(code.badRequestNumb).json(
        fail(condition.error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    }
    const update = await putStatus({ _id: req.params.id }, body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(update);
    }
  } catch (error) {
    logger.error(error.message);
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const deleteStatus = async (req, res) => {
  try {
    const remove = await delStatus({ _id: req.params.id });
    res.json(remove);
  } catch (error) {
    logger.error(error.message);
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

export {
  createStatus, readStatus, readOneStatus, updateStatus, deleteStatus,
};
