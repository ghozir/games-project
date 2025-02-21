const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/release-note/repositories/commands/command');

describe('Release-Note-command', () => {
  describe('updateVerStudent', () => {
    const queryResult = {
      'err': null,
      'data': {}
    };

    it('should success to insert data to db', async() => {

      const db = {
        updateOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db, db);
      await command.updateVerStudent({});
    });
  });
  describe('updateVerTeacher', () => {
    const queryResult = {
      'err': null,
      'data': {}
    };

    it('should success to insert data to db', async() => {

      const db = {
        updateOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db, db);
      await command.updateVerTeacher({});
    });
  });
});
