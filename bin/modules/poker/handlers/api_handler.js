const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
// const queryHandler = require('../repositories/queries/query_handler');
// const queryModel = require('../repositories/queries/query_model');
const wrapper = require('../../../helpers/utils/wrapper');
const validator = require('../../../helpers/utils/validator');
const { SUCCESS: http } = require('../../../helpers/http-status/status_code');

const pokerStart = async (req, res) => {
  const payload = {
    ...req.body,
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.pokerNew);

  const postRequest = (result) => (result.err ? result : commandHandler.pokerStart(result.data, req.user));

  const sendResponse = (result) => {
    result.err
      ? wrapper.response(res, 'fail', result, 'Failed to start poker')
      : wrapper.response(res, 'success', result, 'Successfully start poker');
  };

  sendResponse(await postRequest(validatePayload));
};

const pokerNextMove = async (req, res) => {
  const payload = {
    ...req.params,
    ...req.body,
  };
  const validatePayload = validator.isValidPayload(payload, commandModel.pokerNextMove);

  const postRequest = (result) => (result.err ? result : commandHandler.login(result.data));

  const sendResponse = (result) => {
    result.err
      ? wrapper.response(res, 'fail', result, 'Failed to log admin in')
      : wrapper.response(res, 'success', result, 'Successfully log admin in');
  };

  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  pokerStart,
  pokerNextMove,
};
