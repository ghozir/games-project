const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/release-note/repositories/queries/query');
// const minio = require('../../../../../../bin/helpers/components/minio/minio');

describe('findLastest', () => {

  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query(db,db,db);
    await query.findLastest({});
  });
});

describe('findTeacher', () => {
  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query(db,db,db);
    await query.findTeacher({});
  });
});

describe('findStudent', () => {
  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query(db,db,db);
    await query.findStudent({});
  });
});

