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
      expect(create).to.be.an('object');
      expect(create).to.have.property('status');
      statusModel.restore();
    });
  });

  describe('test get', () => {
    it('get', async () => {
      const statusModel = sinon.stub(status, 'find');
      statusModel.resolves([data]);
      const find = await statusService.findStatus(data);
      expect(find).to.be.an('array');
      statusModel.restore();
    });
  });

  describe('test get', () => {
    it('get', async () => {
      const statusModel = sinon.stub(status, 'findOne');
      statusModel.resolves(data);
      const find = await statusService.findOneStatus(data);
      expect(find).to.be.an('object');
      statusModel.restore();
    });
  });

  describe('test delete', () => {
    it('get', async () => {
      const statusModel = sinon.stub(status, 'deleteOne');
      statusModel.resolves(data);
      const del = await statusService.delStatus(data);
      expect(del).to.be.an('object');
      statusModel.restore();
    });
  });
});
