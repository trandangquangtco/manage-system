/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import {
  addProjectType, findProjectType, findOneProjectType, putProjectType, delProjectType,
} from '../../services/category/projectTypeService.js';
import { fail, success } from '../../helpers/response.js';
import * as code from '../../constant/code.js';

const createProjectType = async (req, res) => {
  try {
    const body = req.body;
    const create = await addProjectType(body);
    res.json(success('project type', 'post', create));
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
  }
};

const readProjectType = async (req, res) => {
  try {
    const read = await findProjectType(req.query);
    if (read.length < 1) {
      res.json(success('project type', 'get', code.noValidFound));
    }
    res.json(success('project type', 'get', read));
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
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
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createProjectType, readOneProjectType, readProjectType, updateProjectType, deleteProjectType,
};
