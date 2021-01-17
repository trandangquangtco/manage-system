/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable import/extensions */
import { findProjectType } from '../../services/category/projectTypeService.js';
import { findStatus } from '../../services/category/statusService.js';
import { findProject } from '../../services/manage/projectService.js';
import { findTech } from '../../services/category/techService.js';
import { success, fail } from '../../helpers/response.js';
import * as code from '../../constant/code.js';

const statusInProject = async (req, res) => {
  try {
    const queryStatus = req.query.status;
    const query = {};
    if (queryStatus) { query.status = queryStatus; }
    const queryFrom = req.query.from || '2021-01-01';
    const queryTo = req.query.to || '2021-12-31';
    const condition = await findStatus({
      status: query.status,
      createdAt: { $gte: queryFrom || '2021-01-01', $lte: queryTo || '2021-12-31' },
    });
    if (condition.length > 0) {
      const report = await findProject({ status: condition[0]._id });
      res.json(success('post', 'report status', {
        amount: report.length,
        data: report,
      }));
    } else {
      res.json(success('post', 'report', null));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const TypeInProject = async (req, res) => {
  try {
    const queryProjectType = req.query.projectType;
    const query = {};
    if (queryProjectType) { query.projectType = queryProjectType; }
    const queryFrom = req.query.from || '2021-01-01';
    const queryTo = req.query.to || '2021-12-31';
    const condition = await findProjectType({
      projectType: query.projectType,
      createdAt: { $gte: queryFrom || '2021-01-01', $lte: queryTo || '2021-12-31' },
    });
    if (condition.length > 0) {
      const report = await findProject({ projectType: condition[0]._id });
      res.json(success('post', 'report project type', {
        amount: report.length,
        data: report,
      }));
    } else {
      res.json(success('post', 'report', null));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

const techStackInProject = async (req, res) => {
  try {
    const queryTechStack = req.query.techStack;
    const query = {};
    if (queryTechStack) { query.techStack = queryTechStack; }
    const queryFrom = req.query.from || '2021-01-01';
    const queryTo = req.query.to || '2021-12-31';
    const condition = await findTech({
      techStack: query.techStack,
      createdAt: { $gte: queryFrom || '2021-01-01', $lte: queryTo || '2021-12-31' },
    });
    if (condition.length > 0) {
      const report = await findProject({ techStack: condition[0]._id });
      res.json(success('post', 'report project type', {
        amount: report.length,
        data: report,
      }));
    } else {
      res.json(success('post', 'report', null));
    }
  } catch (error) {
    res.status(code.badRequestNumb)
      .json(
        fail(error.message, code.badRequest, code.badRequestCode, code.badRequestNumb),
      );
  }
};

export {
  statusInProject, TypeInProject, techStackInProject,
};
