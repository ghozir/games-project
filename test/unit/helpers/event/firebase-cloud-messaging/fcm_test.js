const Fcm = require('../../../../../bin/helpers/events/firebase-cloud-messaging/fcm');
const connection = require('../../../../../bin/helpers/events/firebase-cloud-messaging/connection');
const sinon = require('sinon');

describe('fcm', () => {
  const fcm = new Fcm('dev');
  describe('sendToDevice', () => {
    it('error connect', async() => {
      sinon.stub(connection, 'isConnected').resolves(null);
      await fcm.sendToDevice('1', {});
      connection.isConnected.restore();
    });
  });

  describe('sendToManyDevice', () => {
    it('error connect', async() => {
      sinon.stub(connection, 'isConnected').resolves(null);
      await fcm.sendToManyDevice('1', {});
      connection.isConnected.restore();
    });
  });

  describe('sendToTopics', () => {
    it('error connect', async() => {
      sinon.stub(connection, 'isConnected').resolves(null);
      await fcm.sendToTopics('1', {});
      connection.isConnected.restore();
    });
  });
});

