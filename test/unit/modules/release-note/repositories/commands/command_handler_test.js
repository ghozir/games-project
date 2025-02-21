const commandHandler = require('../../../../../../bin/modules/release-note/repositories/commands/command_handler');
const ReleaseNote = require('../../../../../../bin/modules/release-note/repositories/commands/domain');
const sinon = require('sinon');

describe('Pengumuman-commandHandler', () => {

  const data = {
    success: true,
    data: null,
    message: 'Success create data',
    code: 200
  };

  describe('closeUpdate', () => {
    it('should return post data', async() => {
      sinon.stub(ReleaseNote.prototype, 'closeUpdate').resolves(data);
      await commandHandler.closeUpdate({});
      ReleaseNote.prototype.closeUpdate.restore();
    });
  });
});
