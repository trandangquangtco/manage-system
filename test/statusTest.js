/* eslint-disable no-undef */
/* eslint-disable new-cap */
import chai from 'chai';
import sinon from 'sinon';
import { status } from '../models/category/statusModel';
import * as statusService from '../services/category/statusService';

const { expect } = chai;

describe('test status', () => {
  describe('create status', () => {
    it('success', () => {
      const body = {
        status: 'test create',
        describe: 'describe',
      };
      const input = new status(body);
      const inputMock = sinon.mock(input);
      inputMock.expects('save').yields(null, input);
      const statusStub = sinon.stub(statusService, 'addStatus');
      statusStub.withArgs(body).yields(null, inputMock.object);
      statusService.addStatus(body, (err, result) => {
        statusStub.restore();
        expect(result).to.be.an('object');
        expect(result).to.have.property('status').equal('test create');
      });
    });
  });

  describe('get status', () => {
    it('success', () => {
      const body = {
        status: 'test read',
        describe: 'describe',
      };
      const input = new status(body);
      const inputMock = sinon.mock(input);
      inputMock.expects('save').yields(null, input);
      const statusStub = sinon.stub(statusService, 'findStatus');
      // statusStub.yields(null, inputMock.object);
      statusService.findStatus({}, (err, result) => {
        console.log(result);
        statusStub.restore();
        expect(result).to.be.an('array');
      });
    });
  });
});
