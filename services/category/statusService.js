/* eslint-disable radix */
/* eslint-disable import/extensions */
import { logger } from '../../helpers/logger';
import { fail, success } from '../../helpers/response';
import { status } from '../../models/category/statusModel';
import * as code from '../../constant/code';

const addStatus = async (body) => {
  try {
    const create = await status.create(body);
    return success('post', 'status', create);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const findStatus = async (query, limit, page) => {
  try {
    const read = await status.find(query)
      .limit(parseInt(limit))
      .skip(limit * (page - 1));
    return success('get', 'status', read);
  } catch (error) {
    logger.error(error.message);
    return fail(
      error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
    );
  }
};

const findOneStatus = async (id) => {
  try {
    const read = await status.findOne(id);
    return success('get', 'status', read);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const putStatus = async (id, body) => {
  try {
    const update = await status.findOneAndUpdate(id, body, {
      new: true, runValidators: true,
    });
    if (update == null) {
      return fail(code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb);
    }
    return success('put', 'status', update);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const delStatus = async (id) => {
  try {
    const remove = await status.deleteOne(id);
    if (remove.n === 0) {
      return fail(code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb);
    }
    return success('delete', 'status', remove);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

export {
  addStatus, findStatus, findOneStatus, putStatus, delStatus,
};
