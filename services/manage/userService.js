/* eslint-disable import/extensions */
import { user } from '../../models/manage/userModel.js';

const addUser = (body) => user.create(body);

const findUser = (query) => user.find(query);

const findOneUser = (params) => user.findOne(params);

const putUser = (id, body) => user.findOneAndUpdate(
  id, body, { new: true, runValidators: true },
);

const delUser = (id) => user.deleteOne(id);

export {
  addUser, findOneUser, findUser, putUser, delUser,
};
