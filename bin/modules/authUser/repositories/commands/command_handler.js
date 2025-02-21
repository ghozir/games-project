const AuthUser = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const Redis = require('../../../../helpers/cache/redis/common');
const config = require('../../../../infra/configs/global_config');
const redis = new Redis(config.get('/redisConfig'));

const InjectAdmin = async (payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}`, 'oceaneyes');
  const auth = new AuthUser(redis, db);
  const postCommand = async () => await auth.injectRoot(payload);
  return await postCommand();
};

const login = async (payload) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}`, 'oceaneyes');
  const auth = new AuthUser(redis, db);
  const postCommand = async () => await auth.login(payload);
  return await postCommand();
};

const logout = async (cacheKey) => {
  const auth = new AuthUser(redis);
  const postCommand = async () => await auth.logout(cacheKey);
  return await postCommand();
};

module.exports = {
  InjectAdmin,
  login,
  logout,
};
