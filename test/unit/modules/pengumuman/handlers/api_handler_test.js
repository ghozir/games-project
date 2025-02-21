const sinon = require('sinon');

const pengumumanHandler = require('../../../../../bin/modules/pengumuman/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/pengumuman/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/pengumuman/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/pengumuman/utils/validator');

describe('User Api Handler', () => {

  const res = {
    send: sinon.stub()
  };

  describe('postPengumuman', () => {
    it('should cover error validation', async() => {
      await pengumumanHandler.postPengumuman({}, res);
    });
    it('should cover success post pengumuman', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(commandHandler, 'postData').resolves({err: null, data: {}});
      await pengumumanHandler.postPengumuman({body: {}, files: {}, userInfo: {}}, res);
      validator.isValidPayload.restore();
      commandHandler.postData.restore();
    });
  });

  describe('getPengumuman', () => {
    it('should cover error validation', async() => {
      await pengumumanHandler.getPengumuman({}, res);
    });
    it('should cover success get pengumuman', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'getData').resolves({err: null, data: {}});
      await pengumumanHandler.getPengumuman({}, res);
      validator.isValidPayload.restore();
      queryHandler.getData.restore();
    });
  });

  describe('getPengumumanId', () => {
    it('should cover error validation', async() => {
      await pengumumanHandler.getPengumumanId({}, res);
    });
    it('should cover success get pengumuman', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'getDataById').resolves({err: null, data: {}});
      await pengumumanHandler.getPengumumanId({}, res);
      validator.isValidPayload.restore();
      queryHandler.getDataById.restore();
    });
  });

  describe('putPengumumanId', () => {
    it('should cover error validation', async() => {
      await pengumumanHandler.putPengumuman({}, res);
    });
    it('should cover success put pengumuman', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(commandHandler, 'putData').resolves({err: null, data: {}});
      await pengumumanHandler.putPengumuman({}, res);
      validator.isValidPayload.restore();
      commandHandler.putData.restore();
    });
  });

  describe('delPengumumanId', () => {
    it('should cover error validation', async() => {
      await pengumumanHandler.delPengumuman({}, res);
    });
    it('should cover success del pengumuman', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(commandHandler, 'delData').resolves({err: null, data: {}});
      await pengumumanHandler.delPengumuman({}, res);
      validator.isValidPayload.restore();
      commandHandler.delData.restore();
    });
  });
});
