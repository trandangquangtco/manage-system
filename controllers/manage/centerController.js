/* eslint-disable prefer-destructuring */
/* eslint-disable import/extensions */
import {
  addCenter, findCenter, findOneCenter, putCenter, delCenter, findCenterFull,
} from '../../services/manage/centerService.js';
import { success, fail } from '../../helpers/response.js';
import { findStaff } from '../../services/manage/staffService.js';
import * as code from '../../constant/code.js';

const createCenter = async (req, res) => {
  try {
    const body = req.body;
    const staff = await findStaff({ staff: body.staff });
    if (staff.length < 1) {
      res.status(code.successNumb).json({
        message: 'staff is not exist',
        error: 'InvalidData',
      });
    } else {
      const create = await addCenter(body);
      res.json(success('post', 'create', create));
    }
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
  }
};

const readCenter = async (req, res) => {
  try {
    const read = await findCenter(req.query);
    if (read.length < 1) {
      res.json(success('get', 'center', code.noValidFound));
    }
    res.json(success('get', 'center', read));
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readCenterFull = async (req, res) => {
  try {
    const read = await findCenterFull(req.query);
    if (read.length < 1) {
      res.json(success('get', 'center', code.noValidFound));
    }
    res.json(success('get', 'center', read));
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readOneCenter = async (req, res) => {
  try {
    const readOne = await findOneCenter({ _id: req.params.id });
    if (!readOne) {
      res.json(success('get', 'center', code.noValidFound));
    } else {
      res.json(success('get', 'center', readOne));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateCenter = async (req, res) => {
  try {
    const update = await putCenter({ _id: req.params.id }, req.body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(success('put', 'center', update));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const deleteCenter = async (req, res) => {
  try {
    const remove = await delCenter({ _id: req.params.id });
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('delete', 'center', remove));
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createCenter, readCenter, readOneCenter, updateCenter, deleteCenter, readCenterFull,
};
