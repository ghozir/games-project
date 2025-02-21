const Ujian = require('../../../../../../bin/modules/jadwal_ujian/repositories/queries/domain');
const query = require('../../../../../../bin/modules/jadwal_ujian/repositories/queries/query');
const sinon = require('sinon');
const config = require('../../../../../../bin/infra/configs/global_config');

describe('getAll', () => {
  const http = {
    http: sinon.stub()
  };
  const ujian = new Ujian(http, config);
  describe('getAll', () => {
    it('success get data', async() => {
      sinon.stub(query.prototype,'getData').resolves({err: true, data: [
        {
          data: [{
            _id: '1'
          }],
          total: 10,
          last_page: 5
        }
      ]});
      await ujian.getAll({id: '1'});
      query.prototype.getData.restore();
    });
  });

  describe('nilai', () => {
    it('error data not found', async() => {
      sinon.stub(query.prototype, 'getNilai').resolves({err: true, data: []});
      await ujian.nilai({id: '1'});
      query.prototype.getNilai.restore();
    });
    it('success get data', async() => {
      sinon.stub(query.prototype, 'getNilai').resolves({err: null, data: {
        data: {
          list_jenis_ujian: 'test',
          data_nilai: {
            last_page: 10,
            total: 10,
            data: [{
              catatan2: 'test'
            }]
          }
        }
      }});
      await ujian.nilai({score: '1'});
      query.prototype.getNilai.restore();
    });
  });

  describe('countData', () => {
    it('error data not found', async() => {
      sinon.stub(query.prototype, 'getAllUjian').resolves({err: true, data: []});
      await ujian.countData({id: '1'});
      query.prototype.getAllUjian.restore();
    });
    it('error data not found', async() => {
      sinon.stub(query.prototype, 'getAllUjian').resolves({err: null, data: [
        { status_desc: 'Terlewat'},
        { status_desc: 'Dimulai'},
      ]});
      await ujian.countData({score: '1'});
      query.prototype.getAllUjian.restore();
    });
  });
});

