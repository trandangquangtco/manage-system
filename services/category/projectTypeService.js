/* eslint-disable radix */
import { projectType } from '../../models/category/projectTypeModel';
import { fail, success } from '../../helpers/response';
import { logger } from '../../helpers/logger';
import * as code from '../../constant/code';

const addProjectType = async (body) => {
  try {
    const create = await projectType.create(body);
    return success('post', 'project type', create);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const findProjectType = async (query, limit, page) => {
  try {
    const read = await projectType.find(query)
      .limit(parseInt(limit))
      .skip(limit * (page - 1));
    return success('get', 'project type', read);
  } catch (error) {
    return fail(
      error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
    );
  }
};

const findOneProjectType = async (id) => {
  try {
    const read = await projectType.findOne(id);
    return success('get', 'project type', read);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const putProjectType = async (id, body) => {
  try {
    const update = await projectType.findOneAndUpdate(id, body, {
      new: true, runValidators: true,
    });
    if (update == null) {
      return fail(code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb);
    }
    return success('put', 'project type', update);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

const delProjectType = async (id) => {
  try {
    const remove = await projectType.deleteOne(id);
    if (remove.n === 0) {
      return fail(code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb);
    }
    return success('delete', 'project type', remove);
  } catch (error) {
    logger.error(error.message);
    return fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb);
  }
};

export {
  addProjectType, findOneProjectType, findProjectType, putProjectType, delProjectType,
};
