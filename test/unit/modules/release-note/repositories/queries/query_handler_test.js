const queryHandler = require('../../../../../../bin/modules/release-note/repositories/queries/query_handler');
const ReleaseNote = require('../../../../../../bin/modules/release-note/repositories/queries/domain');
const sinon = require('sinon');
describe('Release-Note-commandHandler', () => {
  const data = {
    success: true,
    data: null,
    message: 'Success create data',
    code: 200
  };
  describe('getData', () => {
    it('should return', async() => {
      sinon.stub(ReleaseNote.prototype, 'getData').resolves(data);
      await queryHandler.getData({});
      ReleaseNote.prototype.getData.restore();
    });
  });

});
