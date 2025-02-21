const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/calendar/repositories/queries/query');
// const minio = require('../../../../../../bin/helpers/components/minio/minio');

describe('getCalendar', () => {

  const db = {
    setCollection: sinon.stub(),
    findPaginated: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query(db);
    await query.getCalendar({});
  });

});

describe('getAKM', () => {
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
  it('should return success', async() => {
    const query = new Query(null, null, http);
    await query.getAKM(payload);
  });
});

describe('getJadwalAKMMobile', () => {
  const db = {
    setCollection: sinon.stub(),
    aggregate: sinon.stub().resolves([])
  };
  it('should return success', async() => {
    const query = new Query(null, null, null, db);
    await query.getJadwalAKMMobile({});
  });

  describe('findManyPengumuman', () => {
    const db = {
      setCollection: sinon.stub(),
      findMany: sinon.stub().resolves([])
    };
    it('should return success', async() => {
      const query = new Query(db);
      await query.findManyPengumuman({});
    });
  });

  describe('findManyJadwal', () => {
    const db = {
      setCollection: sinon.stub(),
      findMany: sinon.stub().resolves([])
    };
    it('should return success', async() => {
      const query = new Query(null, null, null, db);
      await query.findManyJadwal({});
    });
  });
});
