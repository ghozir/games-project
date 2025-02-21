const sinon = require('sinon');

const releaseNoteHandler = require('../../../../../bin/modules/release-note/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/release-note/repositories/commands/command_handler');
const queryHandler = require('../../../../../bin/modules/release-note/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/release-note/utils/validator');

describe('User Api Handler', () => {

  const res = {
    send: sinon.stub()
  };

  describe('getData', () => {
    it('should cover success getData', async() => {
      sinon.stub(queryHandler, 'getData').resolves({err: null, data: {}});
      await releaseNoteHandler.getData({body: {}, files: {}, userInfo: {}}, res);
      queryHandler.getData.restore();
    });
    it('should cover success getData', async() => {
      sinon.stub(queryHandler, 'getData').resolves({err: true, data: {}});
      await releaseNoteHandler.getData({body: {}, files: {}, userInfo: {}}, res);
      queryHandler.getData.restore();
    });
  });

  describe('closeUpdate', () => {
    it('should cover success post pengumuman', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(commandHandler, 'closeUpdate').resolves({err: null, data: {}});
      await releaseNoteHandler.closeUpdate({body: {}, files: {}, userInfo: {}}, res);
      validator.isValidPayload.restore();
      commandHandler.closeUpdate.restore();
    });
    it('should cover error', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(commandHandler, 'closeUpdate').resolves({err: true, data: {}});
      await releaseNoteHandler.closeUpdate({body: {}, files: {}, userInfo: {}}, res);
      validator.isValidPayload.restore();
      commandHandler.closeUpdate.restore();
    });
  });
});
