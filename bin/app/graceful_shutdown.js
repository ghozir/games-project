const logger = require('../helpers/utils/logger');
const kafka = require('../helpers/events/kafka/kafka');

const shutdown = async (server, exitEvent) => {
  logger.info('Graceful-Shutdown', 'Exit signal received.', exitEvent);

  server.close(async () => {
    logger.log('Graceful-Shutdown', 'Server closed, no longer accepting connections.', 'Express.Server::close');

    // Perform cleanup tasks
    // For example, close database connections, release resources, etc.
    await kafka.disconnect();

    process.exit(0);
  });
};

const init = async (server) => {
  process.on('SIGINT', () => shutdown(server, 'SIGINT'));
  process.on('SIGTERM', () => shutdown(server, 'SIGTERM'));
};

module.exports = {
  init
};
