/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
import chai from 'chai';
import sinon from 'sinon';

import * as statusService from '../services/category/statusService';
import { status } from '../models/category/statusModel';

const { expect } = chai;

const body = {
  status: 'demo',
  describe: 'demo',
};
let data;

describe('test status', () => {
  beforeEach(() => {
    const input = new status(body);
    const inputMock = sinon.mock(input);
    inputMock.expects('save').yields(null, input);
    input.save((err, result) => {
      inputMock.verify();
      inputMock.restore();
      data = result;
    });
  });

  describe('test create', () => {
    it('create', async () => {
      const statusModel = sinon.stub(status, 'create');
      statusModel.resolves(data);
      const create = await statusService.addStatus(data);
      expect(create.status).to.equal(200);
      statusModel.restore();
    });
  });

  describe('test get all', () => {
    it('success', async () => {
      const limitModel = sinon.stub().resolves([data]);
      const skipModel = sinon.stub().returns({ skip: limitModel });
      const statusModel = sinon.stub(status, 'find').returns({ limit: skipModel });
      const find = await statusService.findStatus();
      expect(find.status).to.equal(200);
      statusModel.restore();
    });

    it('fail', async () => {
      const limitModel = sinon.stub().resolves([data]);
      const skipModel = sinon.stub().returns({ skip: limitModel });
      const statusModel = sinon.stub(status, 'find').returns({ limit: skipModel });
      statusModel.resolves(data);
      const find = await statusService.findStatus();
      expect(find.status).to.equal(500);
      statusModel.restore();
    });
  });

  describe('test get one', () => {
    it('get', async () => {
      const statusModel = sinon.stub(status, 'findOne');
      statusModel.resolves(data);
      const find = await statusService.findOneStatus();
      expect(find.status).to.equal(200);
      expect(find).to.be.an('object');
      statusModel.restore();
    });
  });

  describe('test delete', () => {
    it('get', async () => {
      const statusModel = sinon.stub(status, 'deleteOne');
      statusModel.resolves(data);
      const del = await statusService.delStatus({ _id: data._id });
      expect(del).to.be.an('object');
      statusModel.restore();
    });
  });
});
