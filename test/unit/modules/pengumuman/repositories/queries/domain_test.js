const Pengumuman = require('../../../../../../bin/modules/pengumuman/repositories/queries/domain');
const query = require('../../../../../../bin/modules/pengumuman/repositories/queries/query');
const sinon = require('sinon');
const commond = require('../../../../../../bin/helpers/utils/common');
const config = require('../../../../../../bin/infra/configs/global_config');
const minio = require('../../../../../../bin/helpers/components/minio/minio');

describe('getAll', () => {

  const db = {
    setCollection: sinon.stub()
  };
  const user = {
    school: 'dev',
    uuid: '13bf9559-d213-4a2e-95ed-210babaeb2bf',
    role: 'student'
  };

  const pengumuman = new Pengumuman(db);

  it('should return pengumuman error', async() => {
    sinon.stub(query.prototype, 'getPaginate').resolves({err: {}, data: null});
    sinon.stub(commond, 'hashDecode').returns('abcdef');
    await pengumuman.getAll({page: 1, size: 10, search: 'abc', role: 'admin', startDate: new Date(), endDate: new Date()}, user);
    query.prototype.getPaginate.restore();
    commond.hashDecode.restore();
  });

  it('should return pengumuman data null', async() => {
    sinon.stub(query.prototype, 'getPaginate').resolves({err: null, data: []});
    sinon.stub(commond, 'hashDecode').returns('abcdef');
    await pengumuman.getAll({page: 1, size: 10, search: 'abc', role: 'admin', startDate: null, endDate: null}, user);
    query.prototype.getPaginate.restore();
    commond.hashDecode.restore();
  });

  it('should return user data', async() => {
    const qRestult = {
      err: null,
      data: [
        {
          _id: '5bac53b45ea76b1e9bd58e1c',
          receiver: 'All',
          description: 'lorem ipsum is dolor sit amet',
          date: new Date(),
          title: 'abcdef',
          file: 'abc/abc.png'
        }
      ]
    };
    sinon.stub(query.prototype, 'getPaginate').resolves(qRestult);
    sinon.stub(commond, 'hashDecode').returns('abcdef');
    await pengumuman.getAll({page: 1, size: 10, search: '', role: 'student'}, user);
    query.prototype.getPaginate.restore();
    commond.hashDecode.restore();
  });

});

describe('getById', () => {

  const db = {
    setCollection: sinon.stub()
  };
  const qRestult = {
    err: null,
    data:
      {
        _id: '5bac53b45ea76b1e9bd58e1c',
        receiver: 'All',
        description: 'lorem ipsum is dolor sit amet',
        date: new Date(),
        title: 'abcdef',
        file: 'abc/abc.png'
      }
  };

  const pengumuman = new Pengumuman(db, minio, config);
  it('error decode', async() => {
    sinon.stub(commond,'hashDecode').returns('error');
    await pengumuman.getById({id: 'as'});
    commond.hashDecode.restore();
  });
  it('error error findById', async() => {
    sinon.stub(commond,'hashDecode').returns('asds');
    sinon.stub(query.prototype,'findById').resolves({err: {}, data: null});
    await pengumuman.getById({id: 'as'});
    query.prototype.findById.restore();
    commond.hashDecode.restore();
  });
  it('data null ssl minio', async() => {
    sinon.stub(commond,'hashDecode').returns('asds');
    sinon.stub(query.prototype,'findById').resolves({err: null, data: null});
    sinon.stub(query.prototype,'getFile').resolves({err: {}, data: null});
    sinon.stub(config,'get').onFirstCall().returns({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'local',
      secretKey: 'supersecret'
    }).onSecondCall().returns('https://m.q');
    await pengumuman.getById({id: 'as'});
    query.prototype.findById.restore();
    commond.hashDecode.restore();
    query.prototype.getFile.restore();
    config.get.restore();
  });

  it('cover ssl minio', async() => {
    sinon.stub(commond,'hashDecode').returns('asds');
    sinon.stub(query.prototype,'findById').resolves(qRestult);
    sinon.stub(query.prototype,'getFile').resolves({err: {}, data: null});
    sinon.stub(config,'get').onFirstCall().returns({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'local',
      secretKey: 'supersecret'
    }).onSecondCall().returns('https://m.q');
    await pengumuman.getById({id: 'as'});
    query.prototype.findById.restore();
    commond.hashDecode.restore();
    query.prototype.getFile.restore();
    config.get.restore();
  });
  it('should return data id', async() => {
    sinon.stub(query.prototype, 'findById').resolves(qRestult);
    sinon.stub(commond, 'hashDecode').returns('abcdef');
    sinon.stub(commond,'hashEncode').returns('laskdak');
    sinon.stub(query.prototype,'getFile').resolves('file.png');
    sinon.stub(config,'get').onFirstCall().returns({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'local',
      secretKey: 'supersecret'
    }).onSecondCall().returns('http://m.q');

    await pengumuman.getById({id: 'askdasd', school: 'devsekolah', role: 'admin'});

    query.prototype.findById.restore();
    query.prototype.getFile.restore();
    commond.hashEncode.restore();
    commond.hashDecode.restore();
    config.get.restore();
  });

});
