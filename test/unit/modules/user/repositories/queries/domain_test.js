const User = require('../../../../../../bin/modules/user/repositories/queries/domain');
const query = require('../../../../../../bin/modules/user/repositories/queries/query');
const sinon = require('sinon');


describe('viewUser', () => {

  const db = {
    setCollection: sinon.stub()
  };

  const user = new User(db);

  it('should return user data', async() => {

    let queryResult = {
      'err': null,
      'data': {}
    };
    sinon.stub(query.prototype, 'findById').resolves(queryResult);
    const userId = '5bac53b45ea76b1e9bd58e1c';
    await user.viewUser(userId);
    query.prototype.findById.restore();
  });

  it('should return error', async() => {
    let queryResult = {
      'err': true,
      'data': null
    };
    sinon.stub(query.prototype, 'findById').resolves(queryResult);
    const userId = '5bac53b45ea76b1e9bd58e1c';
    await user.viewUser(userId);
    query.prototype.findById.restore();

  });
});
