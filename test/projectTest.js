/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import sinon from 'sinon';
import chai from 'chai';
import { project } from '../models/manage/projectModel';
import * as projectService from '../services/manage/projectService';

const { expect } = chai;
// const { stub } = sinon;
const body = {
  _id: 123,
  projectName: 'demo',
  information: 'demo',
};
const bodyArr = [
  {
    projectName: 'demo',
    information: 'demo',
  },
  {
    projectName: 'demo1',
    information: 'demo1',
  },
];
describe('test project', () => {
  describe('create', () => {
    it('success', async () => {
      const projectModel = sinon.stub(project, 'create');
      projectModel.resolves(body);
      const create = await projectService.addProject(body);
      expect(create).to.have.property('projectName').equal('demo');
      projectModel.restore();
    });
  });

  describe('get all', () => {
    it('success', async () => {
      const projectModel = sinon.stub(project, 'find');
      projectModel.resolves(bodyArr);
      const read = await projectService.findProject(bodyArr);
      expect(read).to.be.an('array');
      projectModel.restore();
    });
  });

  describe('get one', () => {
    it('success', async () => {
      const projectModel = sinon.stub(project, 'findOne');
      projectModel.resolves(body);
      const read = await projectService.findOneProject({ _id: body._id });
      expect(read).to.be.an('object');
      expect(read).to.have.property('projectName').equal('demo');
      projectModel.restore();
    });
  });

  describe('get full', () => {
    it('success', async () => {
      const selectModel = sinon.stub().resolves(body);
      const populate1 = sinon.stub().returns({ select: selectModel });
      const populate2 = sinon.stub().returns({ populate: populate1 });
      const populate3 = sinon.stub().returns({ populate: populate2 });
      const populate4 = sinon.stub().returns({ populate: populate3 });
      const populate5 = sinon.stub().returns({ populate: populate4 });
      const projectModel = sinon.stub(project, 'find').returns({ select: populate5 });
      const read = await projectService.findProjectFull();
      expect(read).to.be.an('object');
      projectModel.restore();
    });
  });

  describe('delete', () => {
    it('success', async () => {
      const projectModel = sinon.stub(project, 'deleteOne');
      projectModel.resolves(body);
      const del = await projectService.delProject({ _id: body._id });
      expect(del).to.be.an('object');
      projectModel.restore();
    });
  });
});
