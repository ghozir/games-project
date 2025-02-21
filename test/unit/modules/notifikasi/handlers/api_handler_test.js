const sinon = require('sinon');

const notifikasiHandler = require('../../../../../bin/modules/notifikasi/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/notifikasi/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/notifikasi/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/notifikasi/utils/validator');

describe('User Api Handler', () => {

  const res = {
    send: sinon.stub()
  };

  describe('getNotifikasi', () => {
    it('should cover error validation', async() => {
      await notifikasiHandler.getNotifikasi({}, res);
    });
    it('should cover success post pengumuman', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'getData').resolves({err: null, data: {}});
      await notifikasiHandler.getNotifikasi({body: {}, files: {}, userInfo: {}}, res);
      validator.isValidPayload.restore();
      queryHandler.getData.restore();
    });
  });

  describe('checkNotif', () => {
    it('should success', async () => {
      sinon.stub(queryHandler, 'checkNotif').resolves({ err: null, data: {} });

      await notifikasiHandler.checkNotif({ user: '1234',school:'devsekolah' }, res);

      queryHandler.checkNotif.restore();
    });
    it('should err', async () => {
      sinon.stub(queryHandler, 'checkNotif').resolves({ err: {}, data: null });

      await notifikasiHandler.checkNotif({ user: '1234',school:'devsekolah' }, res);

      queryHandler.checkNotif.restore();
    });
  });


  describe('putNotifikasi', () => {
    it('should success', async () => {
      sinon.stub(commandHandler, 'putData').resolves({ err: null, data: {} });

      await notifikasiHandler.putNotifikasi({ id: '1234',school:'devsekolah' }, res);

      commandHandler.putData.restore();
    });
    it('should err', async () => {
      sinon.stub(commandHandler, 'putData').resolves({ err: {}, data: null });

      await notifikasiHandler.putNotifikasi({ id: '1234',school:'devsekolah' }, res);

      commandHandler.putData.restore();
    });
  });
});
