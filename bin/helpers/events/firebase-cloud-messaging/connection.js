const admin = require('firebase-admin');
const logger = require('../../utils/logger');

const connectionPool = {};

const init = (options) => {
  try {
    const connection = admin.initializeApp({
      credential: admin.credential.cert(options),
    });
    connectionPool[options.project_id] = connection;
  } catch (error) {
    logger.error('connection-fcm', error.message, null, error);
  }
};

const isConnected = (projectId) => connectionPool[projectId] ? true : false;
/**
 *
 * @param {String} projectId
 * @returns {import('firebase-admin').app.App}
 */
const getConnection = (projectId) => connectionPool[projectId];

module.exports = {
  init, isConnected, getConnection
};
