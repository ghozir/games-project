const AppServer = require('./bin/app/server');
const configs = require('./bin/infra/configs/global_config');
const logger = require('./bin/helpers/utils/logger');
const appServer = new AppServer();
const port = process.env.port || configs.get('/port') || 1337;

//testing
appServer.server.listen(port, () => {
  const ctx = 'app-listen'; //app-listen
  logger.log(ctx, `${appServer.server.name} started, listening at ${appServer.server.url}`, 'initate application');
});
