/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
import joi from 'joi';
import _ from 'lodash';
import {
  addProjectType, findProjectType, findOneProjectType, putProjectType, delProjectType,
} from '../../services/category/projectTypeService';
import { fail, success } from '../../helpers/response';
import * as code from '../../constant/code';
import { logger } from '../../helpers/logger';

const createProjectType = async (req, res) => {
  try {
    const body = req.body;
    const input = joi.object({
      projectType: joi.string().required(),
      describe: joi.any(),
      active: joi.boolean(),
      important: joi.number(),
    });
    const condition = input.validate(body);
    if (condition.error) {
      res.status(code.badRequestNumb).json(fail(condition.error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    } else {
      const create = await addProjectType(body);
      res.json(create);
    }
  } catch (error) {
    logger.error(error.message);
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readProjectType = async (req, res) => {
  try {
    const input = req.query;
    const query = _.omit(input, ['page', 'limit', 'from', 'to']);
    query.createdAt = { $gte: input.from || '2021-01-01', $lte: input.to || '2021-12-31' };
    if (input.page < 1) {
      input.page = 1;
    }
    const read = await findProjectType(
      query, input.limit || 3, parseInt(Math.ceil(input.page)),
    );
    res.json(read);
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
    logger.error(error.message);
  }
};

const readOneProjectType = async (req, res) => {
  try {
    const readOne = await findOneProjectType({ _id: req.params.id });
    res.json(success('project type', 'get', readOne));
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateProjectType = async (req, res) => {
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
      res.status(code.badRequestNumb).json(fail(condition.error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    } else {
      const update = await putProjectType({ _id: req.params.id }, body);
      if (update == null) {
        res.json(fail(
          code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
        ));
      } else {
        res.json(success('project type', 'put', update));
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

const deleteProjectType = async (req, res) => {
  try {
    const id = req.params.id;
    const remove = await delProjectType({ _id: id });
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('projectType', 'delete', remove));
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createProjectType, readOneProjectType, readProjectType, updateProjectType, deleteProjectType,
};
