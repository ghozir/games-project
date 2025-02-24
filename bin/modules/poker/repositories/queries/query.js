// const ObjectId = require('mongodb').ObjectId;

class Query {
  constructor(redis, db) {
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} DB
     * @type {DB}
     */
    this.db = db;
    /**
     * @typedef {import('../../../../helpers/cache/redis/common')} Redis
     * @type {Redis}
     */
    this.redis = redis;
  }

  async findOne(parameter) {
    this.db.setCollection('poker');
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }
}

module.exports = Query;
