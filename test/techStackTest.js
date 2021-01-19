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
      expect(create).to.have.property('techStack').equal('demo');
      techStackModel.restore();
    });
  });

  describe('get', () => {
    it('success', async () => {
      const techStackModel = sinon.stub(techStack, 'find');
      techStackModel.resolves(bodyArr);
      const find = await techStackService.findTech();
      expect(find).to.be.an('array');
      techStackModel.restore();
    });
  });

  describe('get one', () => {
    it('success', async () => {
      const techStackModel = sinon.stub(techStack, 'findOne');
      techStackModel.resolves(body);
      const find = await techStackService.findOneTech();
      expect(find).to.be.an('object');
      expect(find).to.have.property('techStack').equal('demo');
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
    });
  });
});
