const Query = require('../../../../../../bin/modules/notifikasi/repositories/queries/query');
const sinon = require('sinon');
const redis = require('../../../../../../bin/helpers/cache/redis/connection');

describe('Notifikasi - Query Test', () => {
  let redisStub;
  beforeEach(async () => {
    redisStub = sinon.stub(redis, 'createClient');
  });
  afterEach( () => {
    redisStub.restore();
  });

  describe('getPaginate', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        aggregate: sinon.stub().resolves({})
      };
      const query = new Query(db);
      await query.getPaginate({});
    });
  });
  describe('checkNotif', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        aggregate: sinon.stub().resolves({})
      };
      const query = new Query(db);
      await query.checkNotif({nisn:'79797979',id:'381b2261-abce-4596-9d71-0bfbc10655fa'});
    });
  });
  describe('countData', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        countAll: sinon.stub().resolves({})
      };
      const query = new Query(db);
      await query.countData({});
    });
  });
  describe('cekRegisIDRecipient', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        aggregate: sinon.stub().resolves({})
      };
      const query = new Query(db);
      await query.cekRegisIDRecipient({});
    });
  });
  describe('findById', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        findOne: sinon.stub().resolves({})
      };
      const query = new Query(db);
      await query.findById({});
    });
  });
  describe('findParentByNisn', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        aggregate: sinon.stub().resolves({})
      };
      const query = new Query(db);
      await query.findParentByNisn({});
    });
  });
});
