const sinon = require('sinon');
const handler = require('../../../../../bin/modules/jadwal_ujian/handlers/api_handler');
const queryHandler = require('../../../../../bin/modules/jadwal_ujian/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/jadwal_ujian/utils/validator');

describe('Jadwal Ujian Api Handler', () => {
  const res = {
    send: sinon.stub()
  };

  describe('getData', () => {
    it('should cover error validation', async() => {
      await handler.getData({}, res);
    });
    it('should cover success get data', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'getData').resolves({err: null, data: {}});
      await handler.getData({}, res);
      validator.isValidPayload.restore();
      queryHandler.getData.restore();
    });
  });

  describe('countData', () => {
    it('should cover error validation', async() => {
      await handler.countData({}, res);
    });
    it('should cover success count data', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'countData').resolves({err: null, data: {}});
      await handler.countData({}, res);
      validator.isValidPayload.restore();
      queryHandler.countData.restore();
    });
  });

  describe('nilai', () => {
    it('should cover error validation', async() => {
      await handler.nilai({}, res);
    });
    it('should cover success nilai', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'nilai').resolves({err: null, data: {}});
      await handler.nilai({}, res);
      validator.isValidPayload.restore();
      queryHandler.nilai.restore();
    });
  });
});
