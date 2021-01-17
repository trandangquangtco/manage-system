import { projectType } from '../../models/category/projectTypeModel';

const addProjectType = (body) => projectType.create(body);

const findProjectType = (query) => projectType.find(query);

const findOneProjectType = (id) => projectType.findOne(id);

const putProjectType = (id, body) => projectType.findOneAndUpdate(id, body,
  { new: true, runValidators: true });

const delProjectType = (id) => projectType.deleteOne(id);

export {
  addProjectType, findOneProjectType, findProjectType, putProjectType, delProjectType,
};
