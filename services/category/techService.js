/* eslint-disable radix */
import { logger } from '../../helpers/logger';
import { success, fail } from '../../helpers/response';
import { techStack } from '../../models/category/techStackModel';
import * as code from '../../constant/code';

const addTech = async (body) => {
  try {
    const create = await techStack.create(body);
    return success('post', 'tech stack', create);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const findTech = async (query, limit, page) => {
  try {
    const read = await techStack.find(query)
      .limit(parseInt(limit))
      .skip(limit * (page - 1));
    return success('get', 'tech stack', read);
  } catch (error) {
    logger.error(error.message);
    return fail(
      error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
    );
  }
};

const findOneTech = async (id) => {
  try {
    const read = await techStack.findOne(id);
    return success('get', 'tech stack', read);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const putTech = async (id, body) => {
  try {
    const update = await techStack.findOneAndUpdate(id, body, {
      new: true, runValidators: true,
    });
    if (update == null) {
      return fail(code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb);
    }
    return success('put', 'tech stack', update);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const delTech = async (id) => {
  try {
    const remove = await techStack.deleteOne(id);
    if (remove.n === 0) {
      return fail(code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb);
    }
    return success('delete', 'tech stack', remove);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, 'Bad Request', 'BAD_REQUEST', 400);
  }
};

export {
  addTech, findOneTech, findTech, putTech, delTech,
};
