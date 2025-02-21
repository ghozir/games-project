
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/user/repositories/queries/query');
const Redis = require('../../../../../../bin/helpers/cache/redis/common');

describe('findById', () => {
  const redisConfig = {
    host: 'localhost',
    port: 6379,
    db: 0,
  };
  const redis = new Redis(redisConfig);

  const rds = {
    setCollection: sinon.stub(),
    get: sinon.stub().resolves({
      'err': null,
      'data': {}
    })
  };

  it('should return success', async() => {
    const query = new Query(rds);
    sinon.stub(redis, 'get').resolves({err: null, data: {username: 'alifsndev'}});
    await query.findById('5bac53b45ea76b1e9bd58e1c');
    redis.get.restore();
  });

});
