const PokerCommand = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const Redis = require('../../../../helpers/cache/redis/common');
const config = require('../../../../infra/configs/global_config');
const redis = new Redis(config.get('/redisConfig'));
const db = new Mongo(`${config.get('/mongoDbUrl')}`, 'games-project');

const pokerCommand = new PokerCommand(redis, db);

const pokerStart = async (payload, user) => {
  return await pokerCommand.pokerStart(payload, user);
};

const pokerNextMove = async (payload, user) => {
  return await pokerCommand.pokerNextMove(payload, user);
};

module.exports = {
  pokerStart,
  pokerNextMove,
};
