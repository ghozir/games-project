const Command = require('../../../../../../bin/modules/notifikasi/repositories/commands/command');
const sinon = require('sinon');

describe('Notifikasi - Command Test', () => {
  describe('insertOne', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        insertOne: sinon.stub().resolves({})
      };
      const command = new Command(db);
      await command.insertOne({});
    });
  });
  describe('upsertByidRef', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        upsertOne: sinon.stub().resolves({})
      };
      const command = new Command(db);
      await command.upsertByidRef({},{});
    });
  });
  describe('upsert', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        upsertOne: sinon.stub().resolves({})
      };
      const command = new Command(db);
      await command.upsert('6302e5ae0a6eb439678aab62',{});
    });
  });
  describe('deleteData', () => {
    it('should success', async () => {
      const db = {
        setCollection: sinon.stub(),
        deleteOne: sinon.stub().resolves({})
      };
      const command = new Command(db);
      await command.deleteData({});
    });
  });

  describe('sendNotif', () => {
    it('should success', async () => {
      const fcm = {
        sendToManyDevice: sinon.stub().resolves({})
      };
      const command = new Command(null, null, fcm);
      await command.sendNotif('1', {data: 'test'}, 'test');
    });
  });
});
