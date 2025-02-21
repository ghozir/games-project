const queryHandler = require('../../../../../../bin/modules/notifikasi/repositories/queries/query_handler');
const Notifikasi = require('../../../../../../bin/modules/notifikasi/repositories/queries/domain');
const sinon = require('sinon');

describe('Notifikasi-queryHandler', () => {

  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });
  const user = {
    school:'devsekolah'
  };
  describe('getData', () => {
    it('should success', async () => {
      sandbox.stub(Notifikasi.prototype, 'getAll').resolves({});
      await queryHandler.getData({},user);
    });
  });
  describe('checkNotif', () => {
    it('should success', async () => {
      sandbox.stub(Notifikasi.prototype, 'checkNotif').resolves({});
      await queryHandler.checkNotif({},user);
    });
  });
});
