require('dotenv').config();
const lodash = require('lodash');
const { name: serviceName } = require('../../../package.json');
const fs = require('fs');
const getPrivateKey = () => {
  if (process.env.PRIVATE_KEY) {
    return process.env.PRIVATE_KEY.replace(/\\n/g, '\n');
  }
  if (process.env.PRIVATE_KEY_PATH) {
    return fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8');
  }
  return undefined;
};
const getPublicKey = () => {
  if (process.env.PUBLIC_KEY) {
    return process.env.PUBLIC_KEY.replace(/\\n/g, '\n');
  }
  if (process.env.PUBLIC_KEY_PATH) {
    return fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8');
  }
  return undefined;
};

const get = (configKey) =>
  lodash.get(config, lodash.trim(configKey.replace(/\//g, '.'), '.'));

const config = {
  port: process.env.PORT,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD,
    },
  ],
  aws: {
    accessKey: process.env.AWS_ACCESS_KEY_ID,
    secretKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    endPoint: process.env.AWS_ENDPOINT,
  },
  jwt: {
    algorithm: process.env.JWT_ALGORITHM ?? 'RS256',
    publicKey: getPublicKey(),
    privateKey: getPrivateKey(),
    privateKeyPassphrase: process.env.PRIVATE_KEY_PASSPHRASE ?? '',
    issuer: process.env.JWT_ISSUER ?? 'telkomdev',
    audience:
      process.env.JWT_AUDIENCE ?? '97b33193-43ff-4e58-9124-b3a9b9f72c34',
  },
  s3BaseUrl: process.env.AWS_BASE_URL,
  s3Bucket: process.env.AWS_BUCKET,
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  dsnSentryUrl: process.env.DSN_SENTRY_URL,
  mongoDbUrl: process.env.MONGO_DB,
  mysqlConfig: {
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  redisConfig: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT || 6379),
    user: process.env.REDIS_USERNAME,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    database: Number(process.env.REDIS_DB || 0),
  },
  postgreConfig: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    max: process.env.POSTGRES_MAX,
    idleTimeoutMillis: process.env.POSTGRES_TIMEOUT,
  },
  elasticsearch: {
    connectionClass: process.env.ELASTICSEARCH_CONNECTION_CLASS || '',
    apiVersion: process.env.ELASTICSEARCH_API_VERSION,
    host: process.env.ELASTICSEARCH_HOST
      ? [process.env.ELASTICSEARCH_HOST]
      : null,
    maxRetries: process.env.ELASTICSEARCH_MAX_RETRIES,
    requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT,
  },
  logstash: {
    applicationName: process.env.ELASTIC_APM_SERVICE_NAME,
    mode: process.env.LOGSTASH_MODE || 'tcp',
    host: process.env.LOGSTASH_HOST,
    port: parseInt(process.env.LOGSTASH_PORT) || 28777,
    maxConnectRetries: parseInt(process.env.LOGSTASH_MAX_CONNECT_RETRIES) || 4,
    timeoutConnectRetries:
      parseInt(process.env.LOGSTASH_TIMEOUT_CONNECT_RETRIES) || 100,
  },
  bucket: process.env.BUCKET_NAME,
  minio: {
    endPoint: process.env.MINIO_HOST,
    port: parseInt(process.env.MINIO_PORT || 9000, 10),
    useSSL: process.env.MINIO_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    region: process.env.AWS_REGION,
  },
  minioAsset: process.env.MINIO_HOST_ASSET,
  akmurl: process.env.AKM_BASE_URL,
  akmEnv: process.env.AKM_ENV || 'local',
  serviceName: process.env.APM_SERVICE_NAME,
  serverUrl: process.env.APM_SERVICE_URL,
  apmtransaction: process.env.APM_TRANSACTION,
  cluster: process.env.CLUSTER_ECOSYSTEM || 2,
  kafkaConfig: {
    clientId: process.env.KAFKA_CLIENT_ID ?? serviceName,
    brokers: process.env.KAFKA_HOST_URL
      ? process.env.KAFKA_HOST_URL.split(',')
      : [],
    sasl: {
      mechanism: process.env.KAFKA_SASL_MECHANISM
        ? process.env.KAFKA_SASL_MECHANISM.toLocaleLowerCase()
        : null,
      username: process.env.KAFKA_SASL_USERNAME,
      password: process.env.KAFKA_SASL_PASSWORD,
    },
    partitions: process.env.KAFKA_PARTITION ?? 3,
    replicationFactors: process.env.KAFKA_REPLICATION_FACTOR ?? 3,
  },
  kafkaTopics: {
    postNotification:
      process.env.KAFKA_TOPIC_POST_NOTIF ||
      'edu-pijarsekolah-broadcast-notifications',
    putNotification:
      process.env.KAFKA_TOPIC_PUT_NOTIF ||
      'edu-pijarsekolah-broadcast-put-notifications',
    deleteNotification:
      process.env.KAFKA_TOPIC_DEL_NOTIF ||
      'edu-pijarsekolah-broadcast-delete-notifications',
  },
  kafkaGroupIds: {
    notification: 'edu-pijarsekolah-consumers-notification',
  },
  fcm: {
    type: process.env.FCM_TYPE,
    project_id: process.env.FCM_PROJECT_ID,
    private_key_id: process.env.FCM_PRIVATE_KEY_ID,
    private_key: (process.env.FCM_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    client_email: process.env.FCM_CLIENT_EMAIL,
    client_id: process.env.FCM_CLIENT_ID,
    auth_uri: process.env.FCM_AUTH_URI,
    token_uri: process.env.FCM_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FCM_AUTH_CERT_URL,
    client_x509_cert_url: process.env.FCM_CLIENT_CERT_URL,
  },
  monitoring: parseInt(process.env.MONITORING) || 0,
  ddTrace: {
    host: process.env.DD_AGENT_HOST,
    port: process.env.DD_TRACE_AGENT_PORT,
  },
};

module.exports = {
  get,
};
