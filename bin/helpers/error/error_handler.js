const logger = require('../utils/logger');
const wrapper = require('../utils/wrapper');

module.exports = (server) => {
  const errorTypes = ['unhandledRejection', 'uncaughtException'];
  errorTypes.forEach(type => {
    process.on(type, err => {
      logger.error('globalErrorHandler', err.message, type, err.stack);
    });
  });

  server.on('restifyError', (req, res, err, callback) => {
    logger.error('globalErrorHandler', err.stack);

    if (process.env.NODE_ENV === 'production') {
      err.message = 'Internal Server Error!';
    } else {
      err.data = err.stack.split('\n').map(i => i.trim());
    }

    wrapper.response(res, 'fail', { err });
    return callback();
  });
};
