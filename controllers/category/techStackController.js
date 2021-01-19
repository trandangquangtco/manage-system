/* eslint-disable import/extensions */
import {
  addTech, findTech, findOneTech, putTech, delTech,
} from '../../services/category/techService.js';
import { fail, success } from '../../helpers/response.js';
import * as code from '../../constant/code.js';

const createTechStack = async (req, res) => {
  try {
    const create = await addTech(req.body);
    return res.json(success('tech stack', 'post', create));
  } catch (error) {
    res.status(code.badRequestNumb).json(fail(error.message, 'Bad Request', code.badRequestCode, code.badRequestNumb));
  }
};

const readTechStack = async (req, res) => {
  try {
    const read = await findTech(req.query);
    if (read.length < 1) {
      res.json(success('Tech Stack', 'get', code.noValidFound));
    } else {
      res.json(success('Tech Stack', 'get', read));
    }
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const readOneTechStack = async (req, res) => {
  try {
    const readOne = await findOneTech({ _id: req.params.id });
    if (!readOne) {
      res.json(success('Tech Stack', 'get', code.noValidFound));
    } else {
      res.json(success('Tech Stack', 'get', readOne));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateTechStack = async (req, res) => {
  try {
    const update = await putTech({ _id: req.params.id }, req.body);
    if (update == null) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    } else {
      res.json(success('Tech Stack', 'put', update));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const deleteTechStack = async (req, res) => {
  try {
    const remove = await delTech({ _id: req.params.id });
    if (remove.n === 0) {
      res.json(fail(
        code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
      ));
    }
    res.json(success('Tech stack', 'delete', remove));
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  createTechStack, readOneTechStack, readTechStack, updateTechStack, deleteTechStack,
};
