/**
 * @author: dennis
 * @email:
 * @since:  2017-1-20
 */

'use strict';

// 获取当前运行的模式
var currentTarget = process.env.npm_lifecycle_event;
var config;

if (currentTarget == 'dev') {
  // 开发调试模式
  config = require('./webpack.config.dev.js');

} else if (currentTarget == 'build') {
  // 发布上线模式
  config = require('./webpack.config.prod.js');
} else{
  console.log('error');
}

module.exports = config;