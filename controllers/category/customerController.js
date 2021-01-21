/* eslint-disable radix */
import _ from 'lodash';
import {
  addCustomer, findCustomer, findOneCustomer, putCustomer, delCustomer,
} from '../../services/category/customerService';
import { fail, success } from '../../helpers/response';
import * as code from '../../constant/code';
import { logger } from '../../helpers/logger';

const createCustomer = async (req, res) => {
  try {
    const create = await addCustomer(req.body);
    res.json(success('customer', 'post', create));
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
      query, parseInt(Math.ceil(input.limit)) || 3, parseInt(Math.ceil(input.page)),
    );
    if (read.length < 1) {
      res.json(success('customer', 'get', code.noValidFound));
    } else {
      res.json(success('customer', 'get', read));
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
      res.json(success('customer', 'get', code.noValidFound));
    } else {
      res.json(success('customer', 'get', readOne));
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
    const update = await putCustomer({ _id: req.params.id }, req.body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(success('customer', 'put', update));
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
    res.json(success('customer', 'delete', remove));
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
