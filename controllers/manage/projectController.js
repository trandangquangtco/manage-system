/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import {
  addProject, findProject, findOneProject, putProject, delProject, findProjectFull,
} from '../../services/manage/projectService.js';
import { findStaff } from '../../services/manage/staffService.js';
import { success, fail } from '../../helpers/response.js';
import * as code from '../../constant/code.js';
import { logger } from '../../helpers/logger';

const createProject = async (req, res) => {
  try {
    const body = req.body;
    const staff = await findStaff({ _id: body.staff });
    if (staff.length < 1) {
      res.status(code.successNumb).json({
        message: 'staff is not exist',
        error: 'InvalidData',
      });
    } else {
      const create = await addProject(body);
      res.json(success('post', 'project', create));
    }
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
    logger.error(error.message);
  }
};

const readProject = async (req, res) => {
  try {
    const read = await findProject(req.query);
    if (read.length < 1) {
      res.json(success('get', 'project', code.noValidFound));
    }
    res.json(success('get', 'project', read));
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
    logger.error(error.message);
  }
};

const readProjectFull = async (req, res) => {
  try {
    const read = await findProjectFull(req.query);
    if (read.length < 1) {
      res.json(success('get', 'project', code.noValidFound));
    }
    res.json(success('get', 'project', read));
  } catch (error) {
    logger.error(error.message);
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readOneProject = async (req, res) => {
  try {
    const readOne = await findOneProject({ _id: req.params.id });
    res.json(success('get', 'project', readOne));
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateProject = async (req, res) => {
  try {
    const update = await putProject({ _id: req.params.id }, req.body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(success('put', 'project', update));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    logger.error(error.message);
  }
};

const deleteProject = async (req, res) => {
  try {
    const remove = await delProject({ _id: req.params.id });
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('delete', 'project', remove));
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createProject, readOneProject, readProject, updateProject, deleteProject, readProjectFull,
};
