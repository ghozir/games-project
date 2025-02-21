const Minio = require('minio');
const config = require('../../../infra/configs/global_config');
const wrapper = require('../../utils/wrapper');
const logger = require('../../utils/logger');
let minioClient;

const init = (params) => {
  try {
    minioClient = new Minio.Client(config.get('/minio'));
    logger.log('minio-init', 'minio initialized', 'info');
  } catch (error) {
    logger.log('minio-init', error, 'error');
  }
};

const isBucketExists = async (bucketName) => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    return Promise.resolve(exists);
  } catch (err) {
    logger.log('minioSdk-isBucketExist', err.message, 'error check bucket');
    return Promise.reject(err);
  }
};

const bucketCreate = async (bucketName, region = 'us-east-1') => {
  try {
    const isExists = await isBucketExists(bucketName);
    if (isExists) {
      return wrapper.data(true);
    }
    await minioClient.makeBucket(bucketName, region);
    return wrapper.data(true);
  } catch (err) {
    logger.log('minioSdk-bucketCreate', err.message, 'error create bucket');
    return wrapper.error(err);
  }
};

const bucketRemove = async (bucketName) => {
  try {
    await minioClient.removeBucket(bucketName);
    return wrapper.data(true);
  } catch (err) {
    logger.log('minioSdk-bucketRemove', err.message, 'error remove bucket');
    return wrapper.error(err);
  }
};

const bufferObjectUpload = async (bucketName, objectName, buffer) => {
  try {
    const isUploaded = await minioClient.putObject(
      bucketName,
      objectName,
      buffer
    );
    return wrapper.data(isUploaded);
  } catch (err) {
    logger.log(
      'minioSdk-bufferObjectUpload',
      err.message,
      'error upload object buffer'
    );
    return wrapper.error(err);
  }
};

const objectUpload = async (bucketName, objectName, filePath, meta) => {
  try {
    const isUploaded = await minioClient.fPutObject(
      bucketName,
      objectName,
      filePath,
      meta
    );
    return wrapper.data(isUploaded);
  } catch (err) {
    logger.log('minioSdk-objectUpload', err.message, 'error upload object');
    return wrapper.error(err);
  }
};

const objectDownload = async (bucketName, objectName, filePath) => {
  try {
    const isDownloaded = await minioClient.fGetObject(
      bucketName,
      objectName,
      filePath
    );
    return wrapper.data(isDownloaded);
  } catch (err) {
    logger.log('minioSdk-objectDownload', err.message, 'error download object');
    return wrapper.error(err);
  }
};

const objectRemove = async (bucketName, objectName) => {
  try {
    await minioClient.removeObject(bucketName, objectName);
    return wrapper.data(true);
  } catch (err) {
    logger.log('minioSdk-objectRemove', err.message, 'error remove object');
    return wrapper.error(err);
  }
};

const objectGetUrl = async (bucketName, objectName, expiry = 604800) => {
  try {
    const getUrl = await minioClient.presignedGetObject(
      bucketName,
      objectName,
      expiry
    );
    return wrapper.data(getUrl);
  } catch (err) {
    logger.log('minioSdk-objectUrl', err.message, 'error get object url');
    return wrapper.error(err);
  }
};

const listObjects = async (bucketName, path = '', recursive = false) => {
  try {
    const objectList = await new Promise((resolve) => {
      const streamData = minioClient.listObjects(bucketName, path, recursive);
      const result = [];
      streamData.on('error', (e) => resolve(wrapper.error(e)));
      streamData.on('data', (e) => result.push(e));
      streamData.on('end', () => resolve(wrapper.data(result)));
    });

    return objectList;
  } catch (err) {
    logger.log('minioSdk-listObjects', err.message, 'error list objects');
    return wrapper.error(err);
  }
};

const wipeOutBucket = async (bucketName) => {
  try {
    const objectList = await listObjects(bucketName, '', true);
    if (objectList.err) {
      return wrapper.error(objectList.err);
    }

    const objects = objectList.data.map((object) => object.name);

    // Remove all objects in the bucket
    for (const objectName of objects) {
      await objectRemove(bucketName, objectName);
    }

    return wrapper.data(true);
  } catch (err) {
    logger.log('minioSdk-wipeOutBucket', err.message, 'error wipe out bucket');
    return wrapper.error(err);
  }
};

module.exports = {
  init,
  isBucketExists,
  bucketCreate,
  bucketRemove,
  objectUpload,
  objectGetUrl,
  objectDownload,
  objectRemove,
  bufferObjectUpload,
  listObjects,
  wipeOutBucket,
};
