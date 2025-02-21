const sinon = require('sinon');

const command = require('../../../../../../bin/modules/pengumuman/repositories/commands/command');
const query = require('../../../../../../bin/modules/pengumuman/repositories/queries/query');
const Pengumuman = require('../../../../../../bin/modules/pengumuman/repositories/commands/domain');
const commandNotifikasi = require('../../../../../../bin/modules/notifikasi/repositories/commands/command');
const queryNotifikasi = require('../../../../../../bin/modules/notifikasi/repositories/queries/query');
const minio = require('../../../../../../bin/helpers/components/minio/minio');
const config = require('../../../../../../bin/infra/configs/global_config');
const logger = require('../../../../../../bin/helpers/utils/logger');
const commond = require('../../../../../../bin/helpers/utils/common');

describe('Pengumuman-domain', () => {
  const db = {
    setCollection: sinon.stub()
  };

  const pengumuman = new Pengumuman(db, config, minio);

  before(() => {
    sinon.stub(logger, 'log');
  });

  after(() => {
    logger.log.restore();
  });

  describe('fileType function', () => {
    it('should return check file type', async() => {
      await pengumuman.fileType('image.png');
    });
  });

  describe('postData', () => {
    it('access denied', async() => {
      await pengumuman.postData({role: 'student'});
    });

    it('should success post', async() => {
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: {}});
      sinon.stub(config,'get').onFirstCall().resolves('pijar-dev');
      sinon.stub(command.prototype,'insertOne').resolves({err: null, data: { _id: '62ef4a5548347a001207febd' }});
      sinon.stub(commandNotifikasi.prototype, 'insertOne').resolves({err: null, data: {}});
      sinon.stub(queryNotifikasi.prototype, 'cekRegisIDRecipient').resolves({err: null, data: [1, 2, 3]});

      const payload = {
        role: 'admin',
        file: {
          name: 'abc.png',
          path: '/usr/tmp/file',
        },
        school: 'devsekolah',
      };
      await pengumuman.postData(payload, {});
      command.prototype.bufferUpload.restore();
      config.get.restore();
      command.prototype.insertOne.restore();
      commandNotifikasi.prototype.insertOne.restore();
      queryNotifikasi.prototype.cekRegisIDRecipient.restore();
    });

    it('should failed upload file', async() => {
      sinon.stub(command.prototype,'bufferUpload').resolves({err: {}, data: null});
      sinon.stub(config,'get').resolves('pijar-dev');
      const payload = {
        role: 'admin',
        file: {
          name: 'abc.png',
          path: '/usr/tmp/file',
        },
        school: 'devsekolah',
      };
      await pengumuman.postData(payload, { school: 'asd' });
      command.prototype.bufferUpload.restore();
      config.get.restore();
    });
  });

  describe('delData', () => {
    it('access denied', async() => {
      await pengumuman.delData({role: 'student'});
    });
    it('decode error', async() => {
      sinon.stub(commond,'hashDecode').returns('error');
      await pengumuman.delData({role: 'admin'});
      commond.hashDecode.restore();
    });
    it('find one error', async() => {
      sinon.stub(commond,'hashDecode').returns('63198c6e302ac238f4243372');
      sinon.stub(query.prototype, 'findById').resolves({err: {}, data: null});
      await pengumuman.delData({role: 'admin', id: 'llakcoaksk'});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
    });
    it('find one null', async() => {
      sinon.stub(commond,'hashDecode').returns('63198c6e302ac238f4243372');
      sinon.stub(query.prototype, 'findById').resolves({err: null, data: null});
      await pengumuman.delData({role: 'admin', id: 'llakcoaksk'});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
    });
    it('delete error', async() => {
      sinon.stub(commond,'hashDecode').returns('63198c6e302ac238f4243372');
      sinon.stub(query.prototype, 'findById').resolves({err: null, data: {}});
      sinon.stub(command.prototype, 'deleteData').resolves({err: {}, data: null});
      await pengumuman.delData({role: 'admin', id: 'llakcoaksk'});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.deleteData.restore();
    });
    it('should sucess delete', async() => {
      sinon.stub(commond,'hashDecode').returns('63198c6e302ac238f4243372');
      sinon.stub(query.prototype, 'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype, 'deleteData').resolves({err: null, data: {}});
      sinon.stub(command.prototype, 'removeFile').resolves({err: null, data: ''});
      sinon.stub(config, 'get').resolves('pijar-dev');

      await pengumuman.delData({role: 'admin', id: 'llakcoaksk'});

      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.deleteData.restore();
      command.prototype.removeFile.restore();
      config.get.restore();
    });
    it('should failed remove file', async() => {
      sinon.stub(commond,'hashDecode').returns('abcdefghij');
      sinon.stub(query.prototype, 'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype, 'deleteData').resolves({err: null, data: {}});
      sinon.stub(command.prototype, 'removeFile').resolves({err: {}, data: null});
      sinon.stub(config, 'get').resolves('pijar-dev');

      await pengumuman.delData({role: 'admin', id: 'llakcoaksk'});

      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.deleteData.restore();
      command.prototype.removeFile.restore();
      config.get.restore();
    });
  });

  describe('putData domain', () => {
    it('decode error', async() => {
      sinon.stub(commond,'hashDecode').returns('error');
      await pengumuman.putData({id: 'asd'});
      commond.hashDecode.restore();
    });

    it('find Error', async() => {
      sinon.stub(commond,'hashDecode').returns('asdasd');
      sinon.stub(query.prototype,'findById').resolves({err: {}, data: null});
      await pengumuman.putData({id: 'asd'});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
    });

    it('find not found', async() => {
      sinon.stub(commond,'hashDecode').returns('asdasd');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: null});
      await pengumuman.putData({id: 'asd'});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
    });

    it('should return success upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: null, data: 'succes'});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'upsert').resolves({err: null, data: {}});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

    it('should cover empty file upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: null, data: 'succes'});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'upsert').resolves({err: null, data: {}});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        file: {
          size: 0
        },
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

    it('should cover empty file upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: null, data: 'succes'});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'upsert').resolves({err: null, data: {}});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        file: {
          name: 'image.exe',
          path: '/usr/tmp/bin',
          type: 'file/exe',
          size: 100
        },
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

    it('should cover empty file upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: {}, data: null});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'upsert').resolves({err: null, data: {}});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        file: {
          name: 'image.png',
          path: '/usr/tmp/bin',
          type: 'image/png',
          size: 100
        },
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

    it('should cover empty file upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: {}, data: null});
      sinon.stub(command.prototype,'upsert').resolves({err: null, data: {}});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        file: {
          name: 'image.png',
          path: '/usr/tmp/bin',
          type: 'image/png',
          size: 100
        },
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

    it('should return success upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: null, data: 'succes'});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'upsert').resolves({err: null, data: {}});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        file: {
          name: 'image.png',
          path: '/usr/tmp/bin',
          type: 'image/png',
          size: 100
        },
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

    it('should return failed file large upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: null, data: 'succes'});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'upsert').resolves({err: null, data: {}});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        file: {
          name: 'image.png',
          path: '/usr/tmp/bin',
          type: 'image/png',
          size: 100000000
        },
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

    it('should return failed upsertData', async() => {
      sinon.stub(commond, 'hashDecode').returns('abcdefghijkl');
      sinon.stub(query.prototype,'findById').resolves({err: null, data: {_id: '5bac53b45ea76b1e9bd58e1c'}});
      sinon.stub(command.prototype,'removeFile').resolves({err: null, data: 'succes'});
      sinon.stub(command.prototype,'bufferUpload').resolves({err: null, data: 'success'});
      sinon.stub(command.prototype,'upsert').resolves({err: {}, data: null});
      sinon.stub(config, 'get').returns('pijar-dev');
      const payload = {
        file: {
          name: 'image.png',
          path: '/usr/tmp/bin',
          type: 'image/png',
          size: 100
        },
        id: 'asdadasd',
        school: 'devsekolah',
        receiver: 'all'
      };
      await pengumuman.putData(payload, {});
      commond.hashDecode.restore();
      query.prototype.findById.restore();
      command.prototype.removeFile.restore();
      command.prototype.bufferUpload.restore();
      command.prototype.upsert.restore();
      config.get.restore();
    });

  });
});
