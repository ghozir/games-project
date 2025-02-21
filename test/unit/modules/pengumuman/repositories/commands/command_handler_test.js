const commandHandler = require('../../../../../../bin/modules/pengumuman/repositories/commands/command_handler');
const Pengumuman = require('../../../../../../bin/modules/pengumuman/repositories/commands/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Pengumuman-commandHandler', () => {

  const data = {
    success: true,
    data: null,
    message: 'Success create data',
    code: 200
  };

  describe('postData', () => {

    it('should return post data', async() => {
      sinon.stub(Pengumuman.prototype, 'postData').resolves(data);

      const rs = await commandHandler.postData({});

      assert.notEqual(rs.data, {});
      assert.equal(rs.code, 200);

      Pengumuman.prototype.postData.restore();
    });
  });

  describe('putData', () => {

    it('should return put data', async() => {
      sinon.stub(Pengumuman.prototype, 'putData').resolves(data);

      const rs = await commandHandler.putData({});

      assert.notEqual(rs.data, {});
      assert.equal(rs.code, 200);

      Pengumuman.prototype.putData.restore();
    });
  });

  describe('delData', () => {

    it('should return del data', async() => {
      sinon.stub(Pengumuman.prototype, 'delData').resolves(data);

      const rs = await commandHandler.delData({});

      assert.notEqual(rs.data, {});
      assert.equal(rs.code, 200);

      Pengumuman.prototype.delData.restore();
    });
  });

});
