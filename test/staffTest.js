/* eslint-disable new-cap */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import sinon from 'sinon';
import { expect } from 'chai';
import { staff } from '../models/manage/staffModel';
import * as staffService from '../services/manage/staffService';

const body = {
  staffName: 'demo',
  ID: 123456,
};

let data;

describe('test staff', () => {
  beforeEach(() => {
    const input = new staff(body);
    const inputMock = sinon.mock(input);
    inputMock.expects('save').yields(null, input);
    input.save((err, result) => {
      inputMock.verify();
      inputMock.restore();
      data = result;
    });
  });

  describe('staff create', () => {
    it('create success', async () => {
      const staffModel = sinon.stub(staff, 'create');
      staffModel.resolves({
        _id: data._id,
        staffName: data.staffName,
        ID: data.ID,
      });
      const create = await staffService.addStaff(data);
      expect(create).to.be.an('object');
      staffModel.restore();
    });
  });

  describe('staff get', () => {
    it('get success', async () => {
      const staffModel = sinon.stub(staff, 'find').returns({
        lean: sinon.stub().resolves([{
          _id: data._id,
          staffName: data.staffName,
          ID: data.ID,
        }]),
      });
      const find = await staffService.findStaff();
      expect(find).to.be.an('array');
      staffModel.restore();
    });
  });

  describe('staff get full', () => {
    it('get success', async () => {
      const selectModel = sinon.stub().resolves({
        _id: data._id,
        staffName: data.staffName,
        ID: data.ID,
      });
      const populate1 = sinon.stub().returns({ select: selectModel });
      const populate2 = sinon.stub().returns({ populate: populate1 });
      const populate3 = sinon.stub().returns({ populate: populate2 });
      const populate4 = sinon.stub().returns({ populate: populate3 });
      const staffModel = sinon.stub(staff, 'find').returns({ select: populate4 });
      const find = await staffService.findStaffFull();
      expect(find).to.have.be.an('object');
      staffModel.restore();
    });
  });

  describe('staff get one', () => {
    it('get success', async () => {
      const staffModel = sinon.stub(staff, 'findOne');
      staffModel.resolves({
        _id: data._id,
        staffName: data.staffName,
        ID: data.ID,
      });
      const find = await staffService.findOneStaff({ _id: data._id });
      expect(find).to.be.an('object');
      expect(find).to.have.property('staffName');
      staffModel.restore();
    });
  });

  describe('staff delete', () => {
    it('delete success', async () => {
      const staffModel = sinon.stub(staff, 'deleteOne');
      staffModel.resolves({
        _id: data._id,
        staffName: data.staffName,
        ID: data.ID,
      });
      const del = await staffService.delStaff({ _id: data._id });
      expect(del).to.be.an('object');
      staffModel.restore();
    });
  });
});
