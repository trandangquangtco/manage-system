/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
import chai from 'chai';
import sinon from 'sinon';
import { staff } from '../../models/manage/staffModel.js';

const { expect } = chai;

describe('unit test staff', () => {
  describe('test create', () => {
    it('create success', (done) => {
      const input = new staff({
        staffName: 'test create',
        information: 'information',
      });
      const inputMock = sinon.mock(input);
      inputMock.expects('save').yields(null, input);
      input.save((err, result) => {
        inputMock.verify();
        inputMock.restore();
        expect(result).to.have.property('staffName').equal('test create');
        done();
      });
    });
  });

  describe('test get', () => {
    it('get success', (done) => {
      const typeMock = sinon.mock(staff);
      const expectResult = [
        {
          staffName: 'test get',
          information: 'information',
        },
        {
          staffName: 'test get2',
          information: 'information',
        },
      ];
      typeMock.expects('find').yields(null, expectResult);
      staff.find((err, result) => {
        typeMock.verify();
        typeMock.restore();
        expect(result).to.be.an('array');
        expect(result.length).to.equal(2);
        done();
        return result;
      });
    });
  });

  describe('test update', () => {
    it('update success', (done) => {
      const typeMock = sinon.mock(new staff({
        staffName: 'before update',
        information: 'information',
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
      const typeMock = sinon.mock(new staff({
        staffName: 'before update',
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
