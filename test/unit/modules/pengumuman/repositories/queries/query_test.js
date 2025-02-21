const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/pengumuman/repositories/queries/query');
// const minio = require('../../../../../../bin/helpers/components/minio/minio');

describe('getPaginated', () => {

  const db = {
    setCollection: sinon.stub(),
    findPaginated: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    await query.getPaginate({});
  });

});
describe('findById', () => {

  const db = {
    setCollection: sinon.stub(),
    findOne: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    await query.findById('5bac53b45ea76b1e9bd58e1c');
  });

});
describe('getFile', () => {

  const minio = {
    init: sinon.stub(),
    objectGetUrl: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query({}, minio);
    await query.getFile('devsekolah', '8789ad457ac341e4fc4cad32');
  });

});
