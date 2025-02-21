const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');

class User {
  constructor(redis) {
    this.query = new Query(redis);
  }

  async viewUser(userId) {
    const user = await this.query.findById(userId);
    if (user.err) {
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = user;
    return wrapper.data(data);
  }
}

module.exports = User;
