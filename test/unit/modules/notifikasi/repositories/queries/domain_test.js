const Query = require('../../../../../../bin/modules/notifikasi/repositories/queries/query');
const Notifikasi = require('../../../../../../bin/modules/notifikasi/repositories/queries/domain');
const wrapper = require('../../../../../../bin/helpers/utils/wrapper');
const sinon = require('sinon');

describe('Notifikasi::Command Domain Test', () => {
  const sandbox = sinon.createSandbox();
  const db = {
    setCollection: sinon.stub()
  };
  const notif = new Notifikasi(db);

  afterEach(() => {
    sandbox.restore();
  });

  const user = {
    role:'parent',
    nisn:'7979797979',
    id:'381b2261-abce-4596-9d71-0bfbc10655fb'
  };

  describe('getAll', () => {
    const payloadNotification = [{
      _id:'381b2261-abce-4596-9d71-0bfbc10655fa',
      readBy:[],
      title:'notif',
      idRef:'381b2261-abce-4596-9d71-0bfbc10655fa',
      content: {
        message: 'Alo Gais',
        date: new Date(),
        startDate: null,
        endDate: null,
      },
      createdAt: new Date(),
    }];

    const payloadNotification2 = [{
      _id:'381b2261-abce-4596-9d71-0bfbc10655fa',
      readBy:['381b2261-abce-4596-9d71-0bfbc10655fb'],
      title:'notif',
      idRef:'381b2261-abce-4596-9d71-0bfbc10655fa',
      content: {
        message: 'Alo Gais',
        date: new Date(),
        startDate: null,
        endDate: null,
      },
      createdAt: new Date(),
    }];

    const payload = {
      size:1,
      page:1,
      type:'Tugas'
    };

    it('should error from role', async () => {
      await notif.getAll(payload,{role:'student'});
    });
    it('should error getPaginate', async () => {
      sandbox.stub(Query.prototype, 'getPaginate').resolves(wrapper.error('query err'));
      await notif.getAll({size:1,page:1,type:'semua'},user);
    });
    it('should error countData', async () => {
      sandbox.stub(Query.prototype, 'getPaginate').resolves(wrapper.data([]));
      sandbox.stub(Query.prototype, 'countData').resolves(wrapper.error('query error'));
      await notif.getAll(payload,user);
    });
    it('should success', async () => {
      sandbox.stub(Query.prototype, 'getPaginate').resolves(wrapper.data(payloadNotification));
      sandbox.stub(Query.prototype, 'countData').resolves(wrapper.data(1));
      await notif.getAll(payload,user);
    });
    it('should success readed', async () => {
      sandbox.stub(Query.prototype, 'getPaginate').resolves(wrapper.data(payloadNotification2));
      sandbox.stub(Query.prototype, 'countData').resolves(wrapper.data(1));
      await notif.getAll(payload,user);
    });
  });
  describe('checkNotif', () => {
    const payloadNotification = [{
      _id:'381b2261-abce-4596-9d71-0bfbc10655fa',
      readBy:[],
      title:'notif',
      idRef:'381b2261-abce-4596-9d71-0bfbc10655fa',
      content: {
        message: 'Alo Gais',
        date: new Date(),
        startDate: null,
        endDate: null,
      },
      createdAt: new Date(),
    }];

    it('should error from role', async () => {
      await notif.checkNotif({role:'student'});
    });
    it('should error getPaginate', async () => {
      sandbox.stub(Query.prototype, 'checkNotif').resolves(wrapper.error('query err'));
      await notif.checkNotif(user);
    });
    it('should success return true', async () => {
      sandbox.stub(Query.prototype, 'checkNotif').resolves(wrapper.data(payloadNotification));
      await notif.checkNotif(user);
    });
    it('should success return false', async () => {
      sandbox.stub(Query.prototype, 'checkNotif').resolves(wrapper.data([]));
      await notif.checkNotif(user);
    });
  });
});
