const sinon = require('sinon');
const winston = require('winston');

const logger = require('../../../../bin/helpers/utils/logger');

describe('Logger', () => {
  describe('log', () => {
    beforeEach(() => {
      sinon.stub(winston, 'createLogger').resolves({
        info: sinon.stub(),
        error: sinon.stub()
      });
    });

    afterEach(() => {
      winston.createLogger.restore();
    });

    it('should send log', () => {
      logger.log('', { err: 'test'}, '');
    });

    it('should send info log', () => {
      logger.info('', { err: 'test'}, '', '');
    });

    it('should send error log', () => {
      logger.error('', { err: 'test'}, '', '');
    });

    it('should cover branch winston-logstash', () => {
      logger.log('', { err: 'test'}, '');
    });
  });
});
