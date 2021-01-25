/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import sinon from 'sinon';
import { expect } from 'chai';
import { projectType } from '../models/category/projectTypeModel';
import * as projectTypeService from '../services/category/projectTypeService';

const body = {
  _id: 123,
  projectType: 'test',
  describe: 'test',
};

describe('test project Type', () => {
  describe('create', () => {
    it('success', async () => {
      const staffModel = sinon.stub(projectType, 'create');
      staffModel.resolves(body);
      const create = await projectTypeService.addProjectType(body);
      expect(create.status).to.equal(200);
      staffModel.restore();
    });
  });

  describe('read', () => {
    it('success', async () => {
      const limitModel = sinon.stub().resolves([body]);
      const skipModel = sinon.stub().returns({ skip: limitModel });
      const staffModel = sinon.stub(projectType, 'find').returns({ limit: skipModel });
      const read = await projectTypeService.findProjectType();
      expect(read.status).to.equal(200);
      staffModel.restore();
    });

    it('fail', async () => {
      const limitModel = sinon.stub().resolves([body]);
      const skipModel = sinon.stub().returns({ skip: limitModel });
      const staffModel = sinon.stub(projectType, 'find').returns({ limit: skipModel });
      staffModel.resolves(body);
      const read = await projectTypeService.findProjectType();
      expect(read.status).to.equal(500);
      staffModel.restore();
    });
  });

  describe('test get one', () => {
    it('get', async () => {
      const staffModel = sinon.stub(projectType, 'findOne');
      staffModel.resolves(body);
      const find = await projectTypeService.findOneProjectType();
      expect(find.status).to.equal(200);
      expect(find).to.be.an('object');
      staffModel.restore();
    });
  });

  describe('test delete', () => {
    it('get', async () => {
      const staffModel = sinon.stub(projectType, 'deleteOne');
      staffModel.resolves(body);
      const del = await projectTypeService.delProjectType({ _id: body._id });
      expect(del).to.be.an('object');
      staffModel.restore();
    });
  });
});
