const queryHandler = require('../../../../../../bin/modules/user/repositories/queries/query_handler');
const User = require('../../../../../../bin/modules/user/repositories/queries/domain');
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
      sinon.stub(User.prototype, 'viewUser').resolves(data);

      const rs = await queryHandler.getUser({});

      assert.notEqual(rs.data, {});
      assert.equal(rs.code, 200);

      User.prototype.viewUser.restore();
    });
  });
});
