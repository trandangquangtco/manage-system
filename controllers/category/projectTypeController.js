/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import _ from 'lodash';
import {
  addProjectType, findProjectType, findOneProjectType, putProjectType, delProjectType,
} from '../../services/category/projectTypeService.js';
import { fail, success } from '../../helpers/response.js';
import * as code from '../../constant/code.js';
import { logger } from '../../helpers/logger';

const createProjectType = async (req, res) => {
  try {
    const body = req.body;
    const create = await addProjectType(body);
    res.json(success('project type', 'post', create));
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    logger.error(error.message);
  }
};

const readProjectType = async (req, res) => {
  try {
    const input = req.query;
    const query = _.omit(input, ['page', 'limit']);
    if (input.page < 1) {
      input.page = 1;
    }
    const read = await findProjectType(
      query, parseInt(Math.ceil(input.limit)) || 3, parseInt(Math.ceil(input.page)),
    );
    res.json(success('project type', 'get', read));
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
    if (!readOne) {
      res.json(success('project type', 'get', code.noValidFound));
    } else {
      res.json(success('project type', 'get', readOne));
    }
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
    const id = req.params.id;
    const update = await putProjectType({ _id: id }, req.body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(success('project type', 'put', update));
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
