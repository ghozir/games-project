class Command {
  constructor(redis, db) {
    // /**
    //  * @typedef {import('../../../../helpers/components/axios/http')} Http
    //  * @type {Http}
    //  */
    // this.http = http;
    /**
     * @typedef {import('../../../../helpers/cache/redis/common')} Redis
     * @type {Redis}
     */
    this.redis = redis;
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} MongoDB
     * @type {MongoDB}
     */
    this.db = db;
  }

  async updatePass(id, params) {
    this.db.setCollection('teachers');
    const res = await this.db.updateOne(id, params);
    return res;
  }

  async insertPokerNewGame(document) {
    this.db.setCollection('poker');
    const result = await this.db.insertOne(document);
    return result;
  }

  async sendEmail(document) {
    const res = await this.emailService.sendEmail(document);
    return res;
  }
}

module.exports = Command;
