const configs = require('./bin/infra/configs/global_config');

module.exports = {
  apps: [{
    name: 'notice-api',
    script: 'index.js',
    exec_mode: 'cluster',
    instances: configs.get('/cluster')
  }]
};