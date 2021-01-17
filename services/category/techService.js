/* eslint-disable import/extensions */
import { techStack } from '../../models/category/techStackModel.js';

const addTech = (body) => techStack.create(body);

const findTech = (query) => techStack.find(query);

const findOneTech = (id) => techStack.findOne(id);

const putTech = (id, body) => techStack.findOneAndUpdate(id, body, {
  new: true, runValidators: true,
});

const delTech = (id) => techStack.deleteOne(id);

export {
  addTech, findOneTech, findTech, putTech, delTech,
};
