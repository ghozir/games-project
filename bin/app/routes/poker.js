const handler = require('../../modules/poker/handlers/api_handler');
// const pooling = require('./mongodb_pooling');

const init = (router, jwtAuth, basicAuth) => {
  //start poker
  router.post('/poker/start', jwtAuth.verifyToken, handler.pokerStart);
  router.post('/poker/next-round/:id', jwtAuth.verifyToken, handler.pokerStart);
};

module.exports = {
  init,
};
