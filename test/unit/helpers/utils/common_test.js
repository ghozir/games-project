const assert = require('assert');

const commonUtil = require('../../../../bin/helpers/utils/common');

describe('Common', () => {
  describe('getLastFromURL', () => {
    it('should return succes', async() => {
      const res = await commonUtil.getLastFromURL('http://localhost:9000/dev');
      assert(res, 'dev');
    });
  });
  describe('encrypt', () => {
    it('should return succes', async() => {
      const res = await commonUtil.encrypt('abcdef','aes-256-ctr','Dom@in2018');
      assert(res, res);
    });
  });
  describe('decrypt', () => {
    it('should return succes', async() => {
      const res = await commonUtil.decrypt('928ea24a70c8','aes-256-ctr','Dom@in2018');
      assert(res, res);
    });
  });
  describe('hashDecode', () => {
    it('should return succes', async() => {
      const res = await commonUtil.hashDecode('5kzj01glLAuGzzNgV31v');
      assert(res, res);
    });
    it('should return error', async() => {
      const res = await commonUtil.hashDecode('5kzj01glLAuGzzNgV31va');
      assert(res, res);
    });
  });
});
