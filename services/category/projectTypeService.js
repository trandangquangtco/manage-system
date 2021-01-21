import { projectType } from '../../models/category/projectTypeModel';

const addProjectType = (body) => projectType.create(body);

const findProjectType = (query, limit, page) => projectType.find(query)
  .limit(limit).skip(limit * (page - 1));

const findOneProjectType = (id) => projectType.findOne(id);

const putProjectType = (id, body) => projectType.findOneAndUpdate(id, body,
  { new: true, runValidators: true });

const delProjectType = (id) => projectType.deleteOne(id);

export {
  addProjectType, findOneProjectType, findProjectType, putProjectType, delProjectType,
};
