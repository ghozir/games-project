const queryHandler = require('../../../../../../bin/modules/pengumuman/repositories/queries/query_handler');
const Pengumuman = require('../../../../../../bin/modules/pengumuman/repositories/queries/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Pengumuman-commandHandler', () => {

  const data = {
    success: true,
    data: null,
    message: 'Success create data',
    code: 200
  };

  describe('getData', () => {

    it('should return post data', async() => {
      sinon.stub(Pengumuman.prototype, 'getAll').resolves(data);

      const rs = await queryHandler.getData({});

      assert.notEqual(rs.data, {});
      assert.equal(rs.code, 200);

      Pengumuman.prototype.getAll.restore();
    });
  });
  describe('getDataById', () => {

    it('should return post data', async() => {
      sinon.stub(Pengumuman.prototype, 'getById').resolves(data);

      const rs = await queryHandler.getDataById({});

      assert.notEqual(rs.data, {});
      assert.equal(rs.code, 200);

      Pengumuman.prototype.getById.restore();
    });
  });
});
