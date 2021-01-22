/* eslint-disable arrow-body-style */
/* eslint-disable import/extensions */
import { project } from '../../models/manage/projectModel';

const addProject = (body) => {
  return project.create(body);
};

const findProject = (query) => project.find(query);

const findProjectFull = (query) => {
  return project.find(query).select('-__v')
    .populate('projectType', '-__v')
    .populate('staff', '-__v')
    .populate('status', '-__v')
    .populate('techStack', '-__v');
};

const findOneProject = (id) => {
  return project.findOne(id);
};

const putProject = (id, body) => project.findOneAndUpdate(
  id, body, { new: true, runValidators: true },
);

const delProject = (id) => project.deleteOne(id);

export {
  addProject, findOneProject, findProject, putProject, delProject, findProjectFull,
};
