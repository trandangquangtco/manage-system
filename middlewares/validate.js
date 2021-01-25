/* eslint-disable import/extensions */
import joi from 'joi';
import { fail } from '../helpers/response.js';
import * as code from '../constant/code.js';

const validateProjectType = async (req, res, next) => {
  try {
    const projectType = joi.object({
      projectType: joi.string().required(),
      describe: joi.any(),
      active: joi.boolean(),
      important: joi.number(),
    });
    await projectType.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details) {
      res.status(code.badRequestNumb).json(fail(error.message, 'Invalid data', 'INVALID_DATA', code.badRequestNumb));
    } else {
      res.status(code.internalErrorNumb)
        .json(fail(
          error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
        ));
    }
  }
};

const validateStatus = async (req, res, next) => {
  try {
    const status = joi.array().items(joi.object().keys({
      status: joi.string().required(),
      describe: joi.any(),
      active: joi.boolean(),
    }));
    await status.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details) {
      res.status(code.badRequestNumb).json(fail(error.message, 'Invalid data', 'INVALID_DATA', code.badRequestNumb));
    } else {
      res.status(code.internalErrorNumb)
        .json(fail(
          error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
        ));
    }
  }
};

const validateTechStack = async (req, res, next) => {
  try {
    const techStack = joi.array().items(joi.object().keys({
      techStack: joi.string().required(),
      describe: joi.any(),
      active: joi.boolean(),
    }));
    await techStack.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details) {
      res.status(code.badRequestNumb).json(fail(error.message, 'Invalid data', 'INVALID_DATA', code.badRequestNumb));
    } else {
      res.status(code.internalErrorNumb)
        .json(fail(
          error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
        ));
    }
  }
};

const validateCustomer = async (req, res, next) => {
  try {
    const customer = joi.object({
      customer: joi.string().required(),
      describe: joi.any(),
      active: joi.boolean(),
      important: joi.number(),
    });
    await customer.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details) {
      res.status(code.badRequestNumb).json(fail(error.message, 'Invalid data', 'INVALID_DATA', code.badRequestNumb));
    } else {
      res.status(code.internalErrorNumb)
        .json(fail(
          error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
        ));
    }
  }
};

const validateProject = async (req, res, next) => {
  try {
    const project = joi.object({
      projectName: joi.string().required(),
      information: joi.any(),
      center: joi.string(),
    });
    await project.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details) {
      res.status(code.badRequestNumb).json(fail(error.message, 'Invalid data', 'INVALID_DATA', code.badRequestNumb));
    } else {
      res.status(code.internalErrorNumb)
        .json(fail(
          error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
        ));
    }
  }
};

const validateCenter = async (req, res, next) => {
  try {
    const center = joi.object({
      centerName: joi.string().required(),
      information: joi.any(),
    });
    await center.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details) {
      res.status(code.badRequestNumb).json(fail(error.details, 'Invalid data', 'INVALID_DATA', code.badRequestNumb));
    } else {
      res.status(code.internalErrorNumb)
        .json(fail(
          error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
        ));
    }
  }
};

const validateStaff = async (req, res, next) => {
  try {
    const staff = joi.object({
      staffName: joi.string().required(),
      birth: joi.date(),
      ID: joi.string(),
      phone: joi.string(),
    });
    await staff.validateAsync(req.body);
    next();
  } catch (error) {
    if (error.details) {
      res.status(code.badRequestNumb).json(fail(error.details, 'Invalid data', 'INVALID_DATA', code.badRequestNumb));
    } else {
      res.status(code.internalErrorNumb)
        .json(fail(
          error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
        ));
    }
  }
};

export {
  validateProjectType, validateStatus, validateTechStack, validateCustomer,
  validateProject, validateCenter, validateStaff,
};
