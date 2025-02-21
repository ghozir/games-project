const commandHandler = require('../../../../../../bin/modules/notifikasi/repositories/commands/command_handler');
const Notifikasi = require('../../../../../../bin/modules/notifikasi/repositories/commands/domain');
const sinon = require('sinon');

describe('Notifikasi-commandHandler', () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => {
    sandbox.restore();
  });

  const payload = {
    user:{
      school:'devsekolah'
    }
  };

  describe('postData', () => {
    it('should success', async () => {
      sandbox.stub(Notifikasi.prototype, 'postData').resolves({});
      await commandHandler.postData(payload);
    });
  });

  describe('putDataKafka', () => {
    it('should success', async () => {
      sandbox.stub(Notifikasi.prototype, 'updateNotifKafka').resolves({});
      await commandHandler.putDataKafka(payload);
    });
  });

  describe('putData', () => {
    it('should success', async () => {
      sandbox.stub(Notifikasi.prototype, 'putData').resolves({});
      await commandHandler.putData({},payload);
    });
  });

  describe('deleteData', () => {
    it('should success', async () => {
      sandbox.stub(Notifikasi.prototype, 'delData').resolves({});
      await commandHandler.deleteData(payload);
    });
  });
});
