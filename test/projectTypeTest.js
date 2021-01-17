/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
import chai from 'chai';
import sinon from 'sinon';

import { projectType } from '../models/category/projectTypeModel.js';

const { expect } = chai;

describe('unit test projectType', () => {
  describe('test create', () => {
    it('create success', (done) => {
      const input = new projectType({
        projectType: 'test create',
        describe: 'describe',
      });
      const inputMock = sinon.mock(input);
      inputMock.expects('save').yields(null, input);
      input.save((err, result) => {
        inputMock.verify();
        inputMock.restore();
        expect(result).to.have.property('projectType').equal('test create');
        done();
      });
    });
  });

  describe('test get', () => {
    it('get success', (done) => {
      const typeMock = sinon.mock(projectType);
      const expectResult = [];
      typeMock.expects('find').yields(null, expectResult);
      projectType.find((err, result) => {
        typeMock.verify();
        typeMock.restore();
        expect(result).to.be.an('array');
        done();
        return result;
      });
    });
  });

  describe('test update', () => {
    it('update success', (done) => {
      const typeMock = sinon.mock(new projectType({
        projectType: 'before update',
        describe: 'describe',
      }));
      const type = typeMock.object;
      typeMock.expects('save').withArgs({ _id: 1234 }).yields(null, type);
      type.save({ _id: 1234 }, (err, result) => {
        typeMock.verify();
        typeMock.restore();
        done();
      });
    });
  });

  describe('test delete', () => {
    it('delete success', (done) => {
      const typeMock = sinon.mock(new projectType({
        projectType: 'before update',
        describe: 'describe',
      }));
      const type = typeMock.object;
      typeMock.expects('remove').withArgs({ _id: 1234 }).yields(null, 'delete');
      type.remove({ _id: 1234 }, (err, result) => {
        typeMock.verify();
        typeMock.restore();
        done();
      });
    });
  });
});
