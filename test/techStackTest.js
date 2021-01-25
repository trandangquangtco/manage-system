/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
import chai from 'chai';
import sinon from 'sinon';

import * as techStackService from '../services/category/techService';
import { techStack } from '../models/category/techStackModel';

const { expect } = chai;
const body = {
  _id: 123,
  techStack: 'demo',
};

const bodyArr = [
  { techStack: 'demo1' },
  { techStack: 'demo2' },
];

describe('test techStack', () => {
  describe('create', () => {
    it('success', async () => {
      const techStackModel = sinon.stub(techStack, 'create');
      techStackModel.resolves(body);
      const create = await techStackService.addTech(body);
      expect(create.status).to.equal(200);
      techStackModel.restore();
    });
  });

  describe('get', () => {
    it('success', async () => {
      const limitModel = sinon.stub().resolves(bodyArr);
      const skipModel = sinon.stub().returns({ skip: limitModel });
      const techStackModel = sinon.stub(techStack, 'find').returns({ limit: skipModel });
      const find = await techStackService.findTech();
      expect(find.status).to.equal(200);
      techStackModel.restore();
    });
  });

  describe('get one', () => {
    it('success', async () => {
      const techStackModel = sinon.stub(techStack, 'findOne');
      techStackModel.resolves(body);
      const find = await techStackService.findOneTech({ _id: body._id });
      expect(find.status).to.equal(200);
      techStackModel.restore();
    });
  });

  describe('delete', () => {
    it('success', async () => {
      const techStackModelFind = sinon.stub(techStack, 'findOne');
      const techStackModelDelete = sinon.stub(techStack, 'deleteOne');
      techStackModelFind.resolves(body);
      techStackModelDelete.resolves(body);
      await techStackService.delTech({ _id: body._id });
      techStackModelFind.restore();
      techStackModelDelete.restore();
    });
  });
});
