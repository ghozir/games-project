const config = require('../infra/configs/global_config');

const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware2');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const mongodbPooling = require('../helpers/databases/mongodb/connection');
const errorHandler = require('../helpers/error/error_handler');
const authUser = require('./routes/authUser');

const minio = require('../helpers/components/minio/minio');
class AppServer {
  constructor() {
    this.server = restify.createServer({
      name: `${project.name}-server`,
      version: project.version,
    });
    // gracefulShutdown.init(this.server);
    errorHandler(this.server);

    this.server.serverKey = '';
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.authorizationParser());

    // required for CORS configuration
    const corsConfig = corsMiddleware({
      preflightMaxAge: 5,
      origins: ['*'],
      // origins: [
      //   'http://*.pijarsekolah.id',
      // ],
      // ['*'] -> to expose all header, any type header will be allow to access
      // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
      allowHeaders: ['Authorization'],
      exposeHeaders: ['Authorization'],
    });
    this.server.pre(corsConfig.preflight);
    this.server.use(corsConfig.actual);

    // // required for basic auth
    this.server.use(basicAuth.init());

    // anonymous can access the end point, place code bellow
    this.server.get('/', async (req, res) => {
      return wrapper.response(res, 'success', wrapper.data(null), 'This service is running properly');
    });

    // routes
    mongodbPooling.init(`${config.get('/mongoDbUrl')}`);

    authUser.init(this.server, jwtAuth, basicAuth);

    minio.init();
    // helpers initiation
  }
}

module.exports = AppServer;
