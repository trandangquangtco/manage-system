/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
import _ from 'lodash';
import {
  addStatus, findOneStatus, findStatus, putStatus, delStatus,
} from '../../services/category/statusService';
import { fail } from '../../helpers/response';
import * as code from '../../constant/code';
import { logger } from '../../helpers/logger';

const createStatus = async (req, res) => {
  try {
    const body = req.body;
    const create = await addStatus(body);
    res.json(create);
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
    const update = await putStatus({ _id: req.params.id }, req.body);
    res.json(update);
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
