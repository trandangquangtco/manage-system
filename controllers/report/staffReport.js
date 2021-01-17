/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
import { findStaff } from '../../services/manage/staffService.js';
import { findTech } from '../../services/category/techService.js';
import { staff } from '../../models/manage/staffModel.js';
import { success, fail } from '../../helpers/response.js';
import * as code from '../../constant/code.js';

const certificateInStaff = async (req, res) => {
  try {
    const { certificate } = req.query;
    const find = await findStaff({ certificate });
    if (find.length > 0) {
      const report = [];
      find.map((data) => {
        report.push({
          staffName: data.staffName,
        });
        return data;
      });
      res.json(success('get', 'report', {
        certificate: req.query.certificate,
        report,
      }));
    } else {
      res.json(success('get', 'center', code.noValidFound));
    }
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const techStackInStaff = async (req, res) => {
  try {
    const condition = await findTech(req.query);
    if (condition.length > 0) {
      const pre = await staff.find().populate({
        path: 'techStack', select: '-_id', populate: { path: 'techStack', select: '_id' },
      });
      let report = [];
      const report1 = [];
      let report2 = [];
      report = pre.map((data) => {
        report.push(data);
        return data.techStack;
      });
      report.map((data) => {
        data.map((data1) => {
          report1.push(data1.techStack.id);
          return data1.techStack.id;
        });
        return data.techStack;
      });
      report2 = report1.filter((data) => String(data) === String(condition[0]._id));
      res.json(success('get', 'report techStack', {
        amount: report2.length,
      }));
    } else {
      res.json(success('get', 'center', code.noValidFound));
    }
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const experienceInStaff = async (req, res) => {
  try {
    const query = {};
    if (req.query.staffName) { query.staffName = req.query.staffName; }
    const condition = await staff.find(query).populate({
      path: 'techStack',
      populate: { path: 'techStack', select: '-__v' },
    });
    let report = [];
    const list = [];
    if (condition.length > 0) {
      condition.map((data) => data.techStack.map((data1) => list.push({
        staffName: data.staffName,
        techStack: data1,
      })));
      list.map((data) => report.push({
        staffName: data.staffName,
        techStack: data.techStack.techStack.techStack,
        framework: data.techStack.framework,
        experience: data.techStack.experience,
      }));
      const { experience } = req.query;
      report = report.filter((data) => data.experience === experience);
      res.json(success('get', 'report', report));
    } else {
      res.json(success('get', 'report', null));
    }
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

const projectInStaff = async (req, res) => {
  try {
    const find = await staff.find();
    const leng = [];
    let current = null;
    let cnt = 0;
    const answer = [];
    find.forEach((data) => leng.push(data.project.length));
    for (let i = 0; i < leng.length; i++) {
      if (leng[i] !== current) {
        if (cnt > 0) {
          answer.push(`join ${current} du an: ${cnt} nguoi`);
        }
        current = leng[i];
        cnt = 1;
      } else {
        cnt++;
      }
    }
    if (cnt > 0) {
      answer.push(`join ${current} du an: ${cnt} nguoi`);
    }
    res.json(success('get', 'report', answer));
  } catch (error) {
    res.status(code.internalErrorNumb)
      .json(fail(
        error.message, code.internalError, code.internalErrorCode, code.internalErrorNumb,
      ));
  }
};

export {
  certificateInStaff, techStackInStaff, experienceInStaff, projectInStaff,
};
