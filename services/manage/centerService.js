/* eslint-disable arrow-body-style */
/* eslint-disable import/extensions */
import { center } from '../../models/manage/centerModel.js';

const addCenter = (body) => center.create(body);

const findCenter = (query) => center.find(query);

const findCenterFull = (query) => {
  return center.find(query).select('-__v')
    .populate('techStack', '-__v')
    .populate({
      path: 'project',
      populate: [
        // { path: 'projectType status techStack staff', select: '-__v' }
        { path: 'projectType', select: '-__v' },
        { path: 'status', select: '-__v' },
        { path: 'techStack', select: '-__v' },
        { path: 'staff', select: '-project -techStack -__v' },
      ],
    })
    .populate('staff', '-__v')
    .lean();
};

const findOneCenter = (id) => center.findOne(id);

const putCenter = (id, body) => center.findOneAndUpdate(
  id, body, { new: true, runValidators: true },
);

const delCenter = (id) => center.deleteOne(id);

export {
  addCenter, findCenter, findOneCenter, putCenter, delCenter, findCenterFull,
};
