const User = require('./domain');
const config = require('../../../../infra/configs/global_config');
const Redis = require('../../../../helpers/cache/redis//common');
// const db = new Mongo(config.get('/mongoDbUrl'));
const redis = new Redis(config.get('/redisConfig'));
const user = new User(redis);

const getUser = async (userId) => {
  const getData = async () => await user.viewUser(userId);
  return await getData();
};

module.exports = {
  getUser,
};
