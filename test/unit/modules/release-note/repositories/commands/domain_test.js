const sinon = require('sinon');

const command = require('../../../../../../bin/modules/release-note/repositories/commands/command');
const ReleaseNote = require('../../../../../../bin/modules/release-note/repositories/commands/domain');
const logger = require('../../../../../../bin/helpers/utils/logger');

describe('Pengumuman-domain', () => {
  const db = {
    setCollection: sinon.stub()
  };

  const releaseNote = new ReleaseNote(db, db);

  before(() => {
    sinon.stub(logger, 'log');
  });

  after(() => {
    logger.log.restore();
  });

  describe('postData', () => {
    it('should success role student', async() => {
      sinon.stub(command.prototype,'updateVerStudent').resolves({err: null, data: { _id: '62ef4a5548347a001207febd' }});
      const payload = {id:'663b33940520f3a9107d2b58'};
      await releaseNote.closeUpdate(payload, {role:'student'});
      command.prototype.updateVerStudent.restore();
    });
    it('should success role teacher', async() => {
      sinon.stub(command.prototype,'updateVerTeacher').resolves({err: true, data: { _id: '62ef4a5548347a001207febd' }});
      const payload = {id:'663b33940520f3a9107d2b58'};
      await releaseNote.closeUpdate(payload, {role:'teacher'});
      command.prototype.updateVerTeacher.restore();
    });
  });
});
