/* eslint-disable arrow-body-style */
/* eslint-disable import/extensions */
import { staff } from '../../models/manage/staffModel.js';

const addStaff = (body) => staff.create(body);

const findStaff = (query) => staff.find(query).lean();

const findStaffFull = (query) => {
  return staff.find(query)
    .select('-__v')
    .populate('status', '-__v')
    .populate({
      path: 'techStack', populate: { path: 'techStack', select: '-__v' },
    })
    .populate({
      path: 'project',
      select: '-staff -__v',
      populate: { path: 'projectType status techStack', select: '-__v' },
    });
};

const findOneStaff = (id) => staff.findOne(id);

const putStaff = (id, body) => staff.findOneAndUpdate(
  id, body, { new: true, runValidators: true },
);

const delStaff = (id) => staff.deleteOne(id);

export {
  addStaff, findOneStaff, findStaff, putStaff, delStaff, findStaffFull,
};
