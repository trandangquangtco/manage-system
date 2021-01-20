/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-useless-path-segments */
import { findProjectType } from '../../services/category/projectTypeService';
import { findStatus } from '../../services/category/statusService';
import { findProject } from '../../services/manage/projectService';
import { findTech } from '../../services/category/techService';
import { success, fail } from '../../helpers/response';
import * as code from '../../constant/code';

const statusInProject = async (req, res) => {
  try {
    const queryStatus = req.query.status;
    const query = {};
    if (queryStatus) { query.status = queryStatus; }
    const queryFrom = req.query.from || '2021-01-01';
    const queryTo = req.query.to || '2021-12-31';
    const condition = await findStatus({
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
    const queryStatus = req.query.status;
    const queryProjectType = req.query.projectType;
    const queryActive = req.query.active;
    const query = {
      createdAt: { $gte: req.query.from || '2021-01-01', $lte: req.query.to || '2021-12-31' },
    };
    if (queryTechStack) { query.techStack = queryTechStack; }
    if (queryStatus) { query.status = queryStatus; }
    if (queryProjectType) { query.projectType = queryProjectType; }
    if (queryActive) { query.active = queryActive; }
    const condition = await findTech(query);
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
