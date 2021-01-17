/* eslint-disable import/extensions */
import {
  addStaff, findOneStaff, findStaff, putStaff, delStaff, findStaffFull,
} from '../../services/manage/staffService.js';
import { success, fail } from '../../helpers/response.js';
import * as code from '../../constant/code.js';

const createStaff = async (req, res) => {
  try {
    const create = await addStaff(req.body);
    res.json(success('post', 'staff', create));
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
  }
};

const readStaff = async (req, res) => {
  try {
    const read = await findStaff(req.query);
    if (read.length < 1) {
      res.json(success('get', 'staff', code.noValidFound));
    }
    res.json(success('get', 'staff', read));
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readStaffFull = async (req, res) => {
  try {
    const read = await findStaffFull(req.query);
    if (read.length < 1) {
      res.json(success('get', 'staff', code.noValidFound));
    }
    res.json(read);
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readOneStaff = async (req, res) => {
  try {
    const readOne = await findOneStaff(req.params.id);
    if (!readOne) {
      res.json(success('get', 'staff', code.noValidFound));
    } else {
      res.json(success('get', 'staff', readOne));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateStaff = async (req, res) => {
  try {
    const update = await putStaff(req.params.id, req.body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(success('put', 'staff', update));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const deleteStaff = async (req, res) => {
  try {
    const remove = await delStaff(req.params.id);
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('delete', 'staff', remove));
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createStaff, readOneStaff, readStaff, updateStaff, deleteStaff, readStaffFull,
};
