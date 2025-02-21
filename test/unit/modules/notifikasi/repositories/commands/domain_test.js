const Query = require('../../../../../../bin/modules/notifikasi/repositories/queries/query');
const Command = require('../../../../../../bin/modules/notifikasi/repositories/commands/command');
const Notifikasi = require('../../../../../../bin/modules/notifikasi/repositories/commands/domain');
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

  describe('sendNotif', () => {
    const payload = {
      nisn:[
        '7979797979'
      ],
      readby:[],
      type:'Tugas',
      title:'Apa aja lah',
      idRef:'6302e5ae0a6eb439678aab62',
      createdAt: new Date(),
      content:'content'
    };

    const parentsId = [
      {
        parentsId:'381b2261-abce-4596-9d71-0bfbc10655fa'
      }
    ];

    it('should error from findParentByNisn', async () => {
      sandbox.stub(Query.prototype, 'findParentByNisn').resolves(wrapper.error('query err'));
      await notif.sendNotif(payload);
    });
    it('should error from cekRegisIDRecipient', async () => {
      sandbox.stub(Query.prototype, 'findParentByNisn').resolves(wrapper.data(parentsId));
      sandbox.stub(Query.prototype, 'cekRegisIDRecipient').resolves(wrapper.error('query err'));
      await notif.sendNotif(payload);
    });
  });

  describe('postData', () => {
    const payloadNotification = {
      type:'Tugas',
      readBy:[],
      title:'notif',
      idRef:'381b2261-abce-4596-9d71-0bfbc10655fa',
      content: {
        message: 'Alo Gais',
        date: new Date(),
        startDate: null,
        endDate: null,
      },
      forUser: [{
        type:'student',
        idReciever:'7979797979'
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      arrayStudentNisn:['7979797979'],
      messageNotif:{
        title:'notif',
        body:''
      }
    };

    it('should error from insertOne', async () => {
      sandbox.stub(Query.prototype, 'findSchool').resolves({data:{uuid:'6302e5ae0a6eb439678aab62'}});
      sandbox.stub(Command.prototype, 'insertOne').resolves({err: true, data:{_id:'6302e5ae0a6eb439678aab62'}});
      sandbox.stub(notif, 'sendNotif').resolves({});
      await notif.postData(payloadNotification);
    });
  });

  describe('updateNotifKafka', () => {
    const payloadNotification = {
      type:'Tugas',
      readBy:[],
      title:'notif',
      idRef:'381b2261-abce-4596-9d71-0bfbc10655fa',
      content: {
        message: 'Alo Gais',
        date: new Date(),
        startDate: null,
        endDate: null,
      },
      forUser: [{
        type:'student',
        idReciever:'7979797979'
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      arrayStudentNisn:['7979797979'],
      messageNotif:{
        title:'notif',
        body:''
      }
    };
    it('should error from upsertByidRef', async () => {
      sandbox.stub(Query.prototype, 'findSchool').resolves({data:{uuid:'6302e5ae0a6eb439678aab62'}});
      sandbox.stub(Query.prototype, 'findById').resolves({err: null, data: payloadNotification});
      sandbox.stub(Command.prototype, 'upsertByidRef').resolves({err: {}, data: {_id:'381b2261-abce-4596-9d71-0bfbc10655fa'}});
      sandbox.stub(notif, 'sendNotif').resolves({});
      await notif.updateNotifKafka(payloadNotification);
    });
    it('should success', async () => {
      sandbox.stub(Query.prototype, 'findSchool').resolves({data:{uuid:'6302e5ae0a6eb439678aab62'}});
      sandbox.stub(Query.prototype, 'findById').resolves({err: null, data: payloadNotification});
      sandbox.stub(Command.prototype, 'upsertByidRef').resolves({err: null, data: {_id:'381b2261-abce-4596-9d71-0bfbc10655fa'}});
      sandbox.stub(notif, 'sendNotif').resolves({});
      await notif.updateNotifKafka(payloadNotification);
    });
  });
  describe('putData', () => {
    const payload = {
      id:'6302e5ae0a6eb439678aab62'
    };

    const user = {
      id: '381b2261-abce-4596-9d71-0bfbc10655fa'
    };

    const payloadNotification = {
      type:'Tugas',
      readBy:[],
      title:'notif',
      idRef:'381b2261-abce-4596-9d71-0bfbc10655fa',
      content: {
        message: 'Alo Gais',
        date: new Date(),
        startDate: null,
        endDate: null,
      },
      forUser: [{
        type:'student',
        idReciever:'7979797979'
      }],
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      arrayStudentNisn:['7979797979'],
      messageNotif:{
        title:'notif',
        body:''
      }
    };

    it('should error from findObj', async () => {
      sandbox.stub(Query.prototype, 'findSchool').resolves({data:{uuid:'6302e5ae0a6eb439678aab62'}});
      sandbox.stub(Query.prototype, 'findById').resolves(wrapper.error('query error'));
      await notif.putData(payload);
    });
    it('should error from upsert', async () => {
      sandbox.stub(Query.prototype, 'findSchool').resolves({data:{uuid:'6302e5ae0a6eb439678aab62'}});
      sandbox.stub(Query.prototype, 'findById').resolves({err: null, data: payloadNotification});
      sandbox.stub(Command.prototype, 'upsert').resolves({err: {}, data: null});
      sandbox.stub(notif, 'sendNotif').resolves({});
      await notif.putData(payload,user);
    });
    it('should success', async () => {
      sandbox.stub(Query.prototype, 'findSchool').resolves({data:{uuid:'6302e5ae0a6eb439678aab62'}});
      sandbox.stub(Query.prototype, 'findById').resolves({err: null, data: payloadNotification});
      sandbox.stub(Command.prototype, 'upsert').resolves({err: null, data: null});
      sandbox.stub(notif, 'sendNotif').resolves({});
      await notif.putData(payload,user);
    });
  });
  describe('delData', () => {
    const payload = {
      idRef:'6302e5ae0a6eb439678aab62'
    };

    it('should error from deleteData', async () => {
      sandbox.stub(Command.prototype, 'deleteData').resolves(wrapper.error('query error'));
      await notif.delData(payload);
    });
    it('should success', async () => {
      sandbox.stub(Command.prototype, 'deleteData').resolves(wrapper.data());
      await notif.delData(payload);
    });
  });
});
