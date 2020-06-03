/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.keys = appInfo.name + '_1580477607856_7530';
  config.middleware = [];
  const userConfig = {
  };
  config.multipart = {
    mode: 'file',
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/project',
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };
  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };
  return {
    ...config,
    ...userConfig,
  };
};
