const Kalender = require('../../../../../../bin/modules/calendar/repositories/queries/domain');
const query = require('../../../../../../bin/modules/calendar/repositories/queries/query');
const sinon = require('sinon');
const commond = require('../../../../../../bin/helpers/utils/common');

describe('getCalendar', () => {

  const db = {
    setCollection: sinon.stub()
  };
  const user = {
    school: 'dev',
    uuid: '13bf9559-d213-4a2e-95ed-210babaeb2bf',
    role: 'teacher'
  };

  const kalender = new Kalender(db);

  it('should return kalender error', async() => {
    sinon.stub(query.prototype, 'getCalendar').resolves({err: {}, data: null});
    sinon.stub(commond, 'hashDecode').returns('abcdef');
    await kalender.getCalendar({page: 1, size: 10, role: 'admin', startDate: new Date(), endDate: new Date()}, user);
    query.prototype.getCalendar.restore();
    commond.hashDecode.restore();
  });

  it('should return kalender data null', async() => {
    sinon.stub(query.prototype, 'getCalendar').resolves({err: null, data: []});
    sinon.stub(commond, 'hashDecode').returns('abcdef');
    await kalender.getCalendar({page: 1, size: 10, role: 'admin', startDate: null, endDate: null}, user);
    query.prototype.getCalendar.restore();
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
    sinon.stub(query.prototype, 'getCalendar').resolves(qRestult);
    sinon.stub(commond, 'hashDecode').returns('abcdef');
    await kalender.getCalendar({page: 1, size: 10, search: '', role: 'teacher'}, user);
    query.prototype.getCalendar.restore();
    commond.hashDecode.restore();
  });
});

describe('getCalenderMobile', () => {
  const db = {
    setCollection: sinon.stub()
  };
  const http = {
    get: sinon.stub()
  };
  const user = {
    school: 'dev',
    schoolUuid: '13bf9559-d213-4a2e-95ed-210babaeb2bf',
  };
  const payload = {
    startDate: new Date(),
    endDate: new Date()
  };
  const kalender = new Kalender(db, null, http);
  it('should return error unauthorized', async() => {
    user.role = 'teacher';
    await kalender.getCalenderMobile({}, user);
  });
  it('should return error data not found', async() => {
    user.role = 'parent';
    sinon.stub(query.prototype, 'getCalendar').resolves({err: true, data: null});
    await kalender.getCalenderMobile(payload, user);
    query.prototype.getCalendar.restore();
  });
  it('should return error data not found', async() => {
    user.role = 'parent';
    sinon.stub(query.prototype, 'getCalendar').resolves({err: null, data: [
      {
        _id: 1,
        receiver: '1',
        title: 'test',
        description: 'test',
        file: 'test',
        date: new Date()
      }
    ]});
    sinon.stub(query.prototype, 'getJadwalAKMMobile').resolves({err: null, data: [
      {
        exam: [{
          _id: 1,
          paket: 'test'
        }],
        paket: [{
          paket: 'test'
        }]
      }
    ]});
    await kalender.getCalenderMobile(payload, user);
    query.prototype.getCalendar.restore();
    query.prototype.getJadwalAKMMobile.restore();
  });
});

describe('getCalendarV2', () => {
  const db = {
    setCollection: sinon.stub()
  };
  const http = {
    get: sinon.stub()
  };
  const user = {
    school: 'dev',
    schoolUuid: '13bf9559-d213-4a2e-95ed-210babaeb2bf',
  };
  const payload = {
    date: new Date(),
  };
  const kalender = new Kalender(db, null, http);
  it('should return error', async() => {
    sinon.stub(query.prototype, 'findManyPengumuman').resolves({err: null, data: []});
    sinon.stub(query.prototype, 'getJadwalAKMMobile').resolves({err: null, data: []});
    await kalender.getCalendarV2(payload, user);
    query.prototype.findManyPengumuman.restore();
    query.prototype.getJadwalAKMMobile.restore();
  });

});
