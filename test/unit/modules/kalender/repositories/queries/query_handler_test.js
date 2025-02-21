const queryHandler = require('../../../../../../bin/modules/calendar/repositories/queries/query_handler');
const Kalender = require('../../../../../../bin/modules/calendar/repositories/queries/domain');
const sinon = require('sinon');
const assert = require('assert');

describe('Kalender-commandHandler', () => {

  const data = {
    success: true,
    data: null,
    message: 'Success create data',
    code: 200
  };

  describe('getCalendar', () => {

    it('should return post data', async() => {
      sinon.stub(Kalender.prototype, 'getCalendar').resolves(data);

      const rs = await queryHandler.getCalendar({});

      assert.notEqual(rs.data, {});
      assert.equal(rs.code, 200);

      Kalender.prototype.getCalendar.restore();
    });
  });

  describe('getCalenderMobile', () => {
    it('should return post data', async() => {
      sinon.stub(Kalender.prototype, 'getCalenderMobile').resolves(data);
      await queryHandler.getCalenderMobile({}, {school: 'test'});
      Kalender.prototype.getCalenderMobile.restore();
    });
  });
  describe('getCalendarV2', () => {
    it('should return post data', async() => {
      sinon.stub(Kalender.prototype, 'getCalendarV2').resolves(data);
      await queryHandler.getCalendarV2({}, {school: 'test'});
      Kalender.prototype.getCalendarV2.restore();
    });
  });
});
