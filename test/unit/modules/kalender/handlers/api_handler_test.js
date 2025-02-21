const sinon = require('sinon');

const kalenderHandler = require('../../../../../bin/modules/calendar/handlers/api_handler');
const queryHandler = require('../../../../../bin/modules/calendar/repositories/queries/query_handler');
const validator = require('../../../../../bin/modules/calendar/utils/validator');

describe('Kalender Api Handler', () => {

  const res = {
    send: sinon.stub()
  };

  describe('getCalendar', () => {
    it('should cover error validation', async() => {
      await kalenderHandler.getCalender({}, res);
    });
    it('should cover success get calendar', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'getCalendar').resolves({err: null, data: {}});
      await kalenderHandler.getCalender({}, res);
      validator.isValidPayload.restore();
      queryHandler.getCalendar.restore();
    });
  });

  describe('getCalenderMobile', () => {
    it('should cover error validation', async() => {
      await kalenderHandler.getCalenderMobile({}, res);
    });
    it('should cover success get calendar', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'getCalenderMobile').resolves({err: null, data: {}});
      await kalenderHandler.getCalenderMobile({}, res);
      validator.isValidPayload.restore();
      queryHandler.getCalenderMobile.restore();
    });
  });

  describe('getCalenderV2', () => {
    it('should cover success get calendar', async() => {
      sinon.stub(validator,'isValidPayload').resolves({err: null, data: {}});
      sinon.stub(queryHandler, 'getCalendarV2').resolves({err: null, data: {}});
      await kalenderHandler.getCalenderV2({}, res);
      validator.isValidPayload.restore();
      queryHandler.getCalendarV2.restore();
    });
  });
});
