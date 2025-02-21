const ReleaseNote = require('../../../../../../bin/modules/release-note/repositories/queries/domain');
const query = require('../../../../../../bin/modules/release-note/repositories/queries/query');
const sinon = require('sinon');

describe('getData', () => {

  const db = {
    setCollection: sinon.stub()
  };
  const user = {
    school: 'dev',
    uuid: '13bf9559-d213-4a2e-95ed-210babaeb2bf',
    role: 'student'
  };

  const releaseNote = new ReleaseNote(db,db,db);

  it('should return success', async() => {
    sinon.stub(query.prototype, 'findStudent').resolves({err: null, data: {lastestVersion:'A'}});
    sinon.stub(query.prototype, 'findLastest').resolves({err: null, data: {_id:'A'}});
    await releaseNote.getData(user);
    query.prototype.findStudent.restore();
    query.prototype.findLastest.restore();
  });
  it('should return success', async() => {
    sinon.stub(query.prototype, 'findStudent').resolves({err: null, data: {lastestVersion:'A'}});
    sinon.stub(query.prototype, 'findLastest').resolves({err: null, data: {_id:'B'}});
    await releaseNote.getData(user);
    query.prototype.findStudent.restore();
    query.prototype.findLastest.restore();
  });
  it('should return error findLastest', async() => {
    sinon.stub(query.prototype, 'findStudent').resolves({err: null, data: {lastestVersion:'A'}});
    sinon.stub(query.prototype, 'findLastest').resolves({err: true, data: {_id:'A'}});
    await releaseNote.getData(user);
    query.prototype.findStudent.restore();
    query.prototype.findLastest.restore();
  });
  it('should return error findLastest', async() => {
    sinon.stub(query.prototype, 'findTeacher').resolves({err: true, data: {lastestVersion:'A'}});
    await releaseNote.getData({...user,role:'teacher'});
    query.prototype.findTeacher.restore();
  });
});
