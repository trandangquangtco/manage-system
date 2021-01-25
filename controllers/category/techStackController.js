/* eslint-disable radix */
/* eslint-disable import/extensions */
import joi from 'joi';
import _ from 'lodash';
import {
  addTech, findTech, findOneTech, putTech, delTech,
} from '../../services/category/techService.js';
import { fail } from '../../helpers/response.js';
import * as code from '../../constant/code.js';
import { logger } from '../../helpers/logger';

const createTechStack = async (req, res) => {
  try {
    const { body } = req;
    const input = joi.object({
      projectType: joi.string().required(),
      describe: joi.any(),
      active: joi.boolean(),
      important: joi.number(),
    });
    const condition = input.validate(body);
    if (condition.error) {
      res.status(code.badRequestNumb).json(
        fail(condition.error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    } else {
      const create = await addTech(req.body);
      res.json(create);
    }
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
    logger.error(error.message);
  }
};

const readTechStack = async (req, res) => {
  try {
    const input = req.query;
    const query = _.omit(input, ['page', 'limit', 'from', 'to']);
    query.createdAt = { $gte: input.from || '2021-01-01', $lte: input.to || '2021-12-31' };
    if (input.page < 1) {
      input.page = 1;
    }
    const read = await findTech(
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

const readOneTechStack = async (req, res) => {
  try {
    const readOne = await findOneTech({ _id: req.params.id });
    res.json(readOne);
  } catch (error) {
    logger.error(error.message);
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const updateTechStack = async (req, res) => {
  try {
    const { body } = req;
    const input = joi.object({
      projectType: joi.string(),
      describe: joi.any(),
      active: joi.boolean(),
      important: joi.number(),
    });
    const condition = input.validate(body);
    if (condition.error) {
      res.status(code.badRequestNumb).json(
        fail(condition.error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    } else {
      const update = await putTech({ _id: req.params.id }, body);
      if (update == null) {
        res.json(fail(
          code.badRequest, 'data not found', code.badRequestCode, code.badRequestNumb,
        ));
      } else {
        res.json(update);
      }
    }
  } catch (error) {
    logger.error(error.message);
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
    res.json(remove);
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
    logger.error(error.message);
  }
};

export {
  createTechStack, readOneTechStack, readTechStack, updateTechStack, deleteTechStack,
};
