/* eslint-disable import/extensions */
import { customer } from '../../models/category/customerModel.js';

const addCustomer = (body) => customer.create(body);

const findCustomer = (query, limit, page) => customer.find(query)
  .limit(limit).skip(limit * (page - 1));

const findOneCustomer = (id) => customer.findOne(id);

const putCustomer = (id, body) => customer.findOneAndUpdate(id, body, {
  new: true, runValidators: true,
});

const delCustomer = (id) => customer.deleteOne(id);

export {
  addCustomer, findCustomer, findOneCustomer, putCustomer, delCustomer,
};
