class HttpError extends Error {
  constructor (code = 500, message = 'Server Error.', data = undefined) {
    super(message);

    // needed for CustomError instanceof Error => true
    Object.setPrototypeOf(this, new.target.prototype);

    // Set the name
    this.name = this.constructor.name;
    this.code = code;
    this.data = data;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = HttpError;
