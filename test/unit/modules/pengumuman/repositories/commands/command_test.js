const assert = require('assert');
const sinon = require('sinon');

const Command = require('../../../../../../bin/modules/pengumuman/repositories/commands/command');
const minio = require('../../../../../../bin/helpers/components/minio/minio');

describe('Pengumuman-command', () => {

  describe('bufferUpload', () => {
    const queryResult = {
      'err': null,
      'data': 'alskdhaskdj'
    };

    it('should success to upload data to minio', async() => {
      const minio = {
        init: sinon.stub().resolves({}),
        objectUpload: sinon.stub().resolves({err: null, data: 'alskdhaskdj'}),
      };
      const command = new Command({}, minio);
      const res = await command.bufferUpload({});
      assert.equal(res.data, queryResult.data);
    });
  });

  describe('insertOne', () => {
    const queryResult = {
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'receiver': 'All',
        'Description': '8789ad457ac341e4fc4cad32',
        'file': '/school/file.pdf'
      }
    };

    it('should success to insert data to db', async() => {

      const db = {
        insertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db, minio);
      const res = await command.insertOne({});
      assert.equal(res.data.receiver, queryResult.data.receiver);
    });
  });

  describe('removeFile', () => {
    const queryResult = {
      'err': null,
      'data': 'alskdhaskdj'
    };

    it('should success to remvoe data minio', async() => {
      const minio = {
        init: sinon.stub().resolves({}),
        objectRemove: sinon.stub().resolves({err: null, data: 'alskdhaskdj'}),
      };
      const command = new Command({}, minio);
      const res = await command.removeFile({});
      assert.equal(res.data, queryResult.data);
    });
  });

  describe('upsert', () => {
    const queryResult = {
      'err': null,
      'data': {
        _id: '5bac53b45ea76b1e9bd58e1c',
        receiver: 'All',
        description: 'example',
        file: 'shchool/file.pdf'
      }
    };

    it('should success to upsert data mongo', async() => {
      const db = {
        upsertOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db, {});
      const res = await command.upsert('5bac53b45ea76b1e9bd58e1c', {});
      assert.equal(res.data, queryResult.data);
    });
  });

  describe('delete data', () => {
    const queryResult = {
      'err': null,
      'data': null
    };

    it('should success to upsert data mongo', async() => {
      const db = {
        deleteOne: sinon.stub().resolves(queryResult),
        setCollection: sinon.stub()
      };
      const command = new Command(db, {});
      const res = await command.deleteData('5bac53b45ea76b1e9bd58e1c');
      assert.equal(res.data, queryResult.data);
    });
  });

});
