/* eslint-disable import/extensions */
import { status } from '../../models/category/statusModel';

const addStatus = (body) => status.create(body);

const findStatus = (query) => status.find(query).lean();

const findOneStatus = (id) => status.findOne(id);

const putStatus = (id, body) => status.findOneAndUpdate(id, body, {
  new: true, runValidators: true,
});

const delStatus = (id) => status.deleteOne(id);

export {
  addStatus, findStatus, findOneStatus, putStatus, delStatus,
};
