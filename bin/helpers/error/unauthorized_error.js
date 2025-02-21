const HttpError = require('./http_error');

class UnauthorizedError extends HttpError {
  constructor(param = 'Unauthorized.') {
    super(401, param.message || param, param.data);
  }
}

module.exports = UnauthorizedError;
