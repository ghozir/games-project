const crypto = require('crypto');
const argon2 = require('argon2');
const wrapper = require('../../helpers/utils/wrapper');
const config = require('../../infra/configs/global_config');

const getLastFromURL = async (url) => {
  let name = decodeURI(url).split('/').pop();
  name = name.replace(/(\r\n|\n|\r)/gm, '');
  return String(name);
};

const encrypt = (text, algorithm, secretKey) => {
  const iv = config.get('/cryptoConfig/iv');
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = (text, algorithm, secretKey) => {
  const iv = config.get('/cryptoConfig/iv');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

const getHash = async (text) => {
  try {
    const hash = await argon2.hash(text).catch((err) => {
      throw err;
    });
    return wrapper.data(hash);
  } catch (error) {
    return wrapper.error(error);
  }
};

const verifyHash = async (argon2Hash, text) => {
  try {
    const result = await argon2.verify(argon2Hash, text).catch((err) => {
      throw err;
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(error);
  }
};

const mapTimezone = (tz) => {
  const timezoneMap = {
    WIB: 'Asia/Jakarta',
    WIT: 'Asia/Jayapura',
    WITA: 'Asia/Makassar',
  };
  return timezoneMap[tz] || 'Asia/Jakarta';
};

module.exports = {
  getLastFromURL,
  encrypt,
  decrypt,
  getHash,
  verifyHash,
  mapTimezone,
};
