const winston = require('winston');
const config = require('../../infra/configs/global_config');

let logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

if (config.get('/logstash/host')) {
  const winstonLogstash = require('winston3-logstash-transport');
  logger.add(new winstonLogstash(config.get('/logstash')));
}

const log = (context, message, scope) => {
  const obj = {
    context,
    scope,
    message: message
  };
  logger.info(obj);
};

const info = (context, message, scope, meta = undefined) => {
  const obj = {
    context,
    scope,
    message: message,
    meta
  };
  logger.info(obj);
};

const error = (context, message, scope, meta = undefined) => {
  const obj = {
    context,
    scope,
    message: message,
    meta
  };
  logger.error(obj);
};

module.exports = {
  log,
  info,
  error,
};
