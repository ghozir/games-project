const sinon = require('sinon');
const Query = require('../../../../../../bin/modules/jadwal_ujian/repositories/queries/query');

describe('getData', () => {
  const http = {
    get: sinon.stub().resolves({})
  };
  const payload = {
    school: 'test',
    nis: '1',
    statusDesc: true,
    status: 'test',
    size: 10,
    page: 1
  };
  const config = {
    get: sinon.stub().resolves({url: 'test'})
  };
  it('should return success', async() => {
    const query = new Query(http, config);
    await query.getData(payload);
  });
});

describe('getAllUjian', () => {
  const http = {
    get: sinon.stub().resolves({})
  };
  const payload = {
    school: 'test',
    nis: '1'
  };
  const config = {
    get: sinon.stub().resolves({url: 'test'})
  };
  it('should return success', async() => {
    const query = new Query(http, config);
    await query.getAllUjian(payload);
  });
});

describe('getNilai', () => {
  const http = {
    get: sinon.stub().resolves({})
  };
  const payload = {
    school: 'test',
    nisn: '1',
    search: '',
    jenisUjian: 'test',
    sortBy: 'test',
    page: 1,
    limit: '10'
  };
  const config = {
    get: sinon.stub().resolves({url: 'test'})
  };
  it('should return success', async() => {
    const query = new Query(http, config);
    await query.getNilai(payload);
  });
});
