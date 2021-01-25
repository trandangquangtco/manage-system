/* eslint-disable radix */
import _ from 'lodash';
import joi from 'joi';
import {
  addCustomer, findCustomer, findOneCustomer, putCustomer, delCustomer,
} from '../../services/category/customerService';
import { fail, success } from '../../helpers/response';
import * as code from '../../constant/code';
import { logger } from '../../helpers/logger';

const createCustomer = async (req, res) => {
  try {
    const { body } = req;
    const input = joi.object({
      customer: joi.string().required(),
      describe: joi.string(),
      active: joi.boolean(),
      important: joi.number(),
    });
    const condition = input.validate(body);
    if (condition.error) {
      res.status(code.badRequestNumb).json(fail(condition.error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    } else {
      const create = await addCustomer(body);
      res.json(success('post', 'customer', create));
    }
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    logger.error(error.message);
  }
};

const readCustomer = async (req, res) => {
  try {
    const input = req.query;
    const query = _.omit(input, ['page', 'limit']);
    if (input.page < 1) {
      input.page = 1;
    }
    const read = await findCustomer(
      query, parseInt(Math.ceil(input.limit)) || 3, parseInt(Math.ceil(input.page)) || 1,
    );
    if (read.length < 1) {
      res.json(success('get', 'customer', code.noValidFound));
    } else {
      res.json(success('get', 'customer', read));
    }
  } catch (error) {
    logger.error(error.message);
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readOneCustomer = async (req, res) => {
  try {
    const readOne = await findOneCustomer({ _id: req.params.id });
    if (!readOne) {
      res.json(success('get', 'customer', code.noValidFound));
    } else {
      res.json(success('get', 'customer', readOne));
    }
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { body } = req;
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
      const update = await putCustomer({ _id: req.params.id }, body);
      if (update == null) {
        res.json(fail(
          code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
        ));
      } else {
        res.json(success('put', 'customer', update));
      }
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    logger.error(error.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const remove = await delCustomer({ _id: req.params.id });
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('delete', 'customer', remove));
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    logger.error(error.message);
  }
};

export {
  createCustomer, readCustomer, readOneCustomer, updateCustomer, deleteCustomer,
};
