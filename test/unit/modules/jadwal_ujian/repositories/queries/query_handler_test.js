const queryHandler = require('../../../../../../bin/modules/jadwal_ujian/repositories/queries/query_handler');
const Ujian = require('../../../../../../bin/modules/jadwal_ujian/repositories/queries/domain');
const sinon = require('sinon');

describe('jadwal ujian-commandHandler', () => {
  describe('getData', () => {
    it('should return post data', async() => {
      sinon.stub(Ujian.prototype, 'getAll').resolves({});
      await queryHandler.getData({});
      Ujian.prototype.getAll.restore();
    });
  });

  describe('countData', () => {
    it('should return post data', async() => {
      sinon.stub(Ujian.prototype, 'countData').resolves({});
      await queryHandler.countData({});
      Ujian.prototype.countData.restore();
    });
  });

  describe('nilai', () => {
    it('should return post data', async() => {
      sinon.stub(Ujian.prototype, 'nilai').resolves({});
      await queryHandler.nilai({});
      Ujian.prototype.nilai.restore();
    });
  });
});
