/**
 * @module libs/es6-promise-auto
 * @author dennis
 * @email
 * @since  17/1/24
 */

import Promise from 'es6-promise';

Promise.polyfill();

/**
 * 导出一个支持import的Promise模块
 * @param {function} executor - function(resolve, reject){ ... }
 * @returns {function}
 */
export default Promise;
