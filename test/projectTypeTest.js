/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import sinon from 'sinon';
import { expect } from 'chai';
import { projectType } from '../models/category/projectTypeModel';
import * as projectTypeService from '../services/category/projectTypeService';

const body = {
  projectType: 'test',
  describe: 'test',
};

describe('test project Type', () => {
  describe('create', () => {
    it('success', async () => {
      const staffModel = sinon.stub(projectType, 'create');
      staffModel.resolves(body);
      const create = await projectTypeService.addProjectType(body);
      expect(create).to.have.property('status').equal(200);
      staffModel.restore();
    });
  });

  describe('read', () => {
    it('success', async () => {
      const staffModel = sinon.stub(projectType, 'find');
      staffModel.resolves(body);
      const create = await projectTypeService.findProjectType();
      expect(create).to.have.property('status').equal(200);
      staffModel.restore();
    });
  });
});
