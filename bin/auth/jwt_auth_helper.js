const jwt = require('jsonwebtoken');
const config = require('../infra/configs/global_config');
const queryAuth = require('../modules/authUser/repositories/queries/query_handler');
const wrapper = require('../helpers/utils/wrapper');
const { UnauthorizedError } = require('../helpers/error');
const logger = require('../helpers/utils/logger');

const jwtConfig = config.get('/jwt');

/**
 *
 * @param {Object} payload JSON Web Token payload
 * @param {Object} options JSON Web Token options
 * @param {String | Number | undefined} options.expiresIn When will the token expires
 * @param {String | undefined} options.subject The subject of JWT
 * @returns Promise<string>
 */
const generateToken = async (payload, options = {}) => {
  const defaultOptions = {
    expiresIn: '100m',
    algorithm: jwtConfig.algorithm,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    keyid: jwtConfig.algorithm,
    ...options,
  };
  return jwt.sign(payload, jwtConfig.privateKey, defaultOptions);
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    }
  }
  return undefined;
};

const verifyToken = (req, res, next) => {
  const token = getToken(req.headers);
  if (!token) {
    const result = wrapper.error(new UnauthorizedError('Unauthenticated.'));
    return wrapper.response(res, 'fail', result, 'Unauthenticated.');
  }

  const publicKey = jwtConfig.publicKey;
  const verifyOptions = {
    algorithm: jwtConfig.algorithm,
    issuer: jwtConfig.issuer,
    audience: jwtConfig.audience,
    allowInvalidAsymmetricKeyTypes: true,
  };

  let decodedToken;
  try {
    decodedToken = wrapper.data(jwt.verify(token, publicKey, verifyOptions));
  } catch (err) {
    logger.error('JWTAuth.verifyToken', 'Failed to verify token', 'jwt.verify', err);
    decodedToken = wrapper.error(new UnauthorizedError('Token verification failed.'));

    if (err instanceof jwt.TokenExpiredError) {
      decodedToken = wrapper.error(new UnauthorizedError('Access token expired.'));
    }

    if (err instanceof jwt.JsonWebTokenError) {
      decodedToken = wrapper.error(new UnauthorizedError('Invalid token.'));
    }
  }
  if (decodedToken.err) {
    return wrapper.response(res, 'fail', decodedToken, decodedToken.err.message);
  }

  queryAuth.getUser(decodedToken.data.sub).then((user) => {
    if (user.err) {
      const result = wrapper.error(new UnauthorizedError('Unauthorized.'));
      return wrapper.response(res, 'fail', result, 'Unauthorized.');
    }

    req.userId = decodedToken.data.sub;
    req.user = user.data;
    next();
  });
};

module.exports = {
  generateToken,
  verifyToken,
};
