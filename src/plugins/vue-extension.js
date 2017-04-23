/**
 * 通过这个插件扩展往Vue上面扩展filters、directives、mixins
 */

import filters from 'filters/main';
import directives from 'directives/main';
import utils from 'utils/main';

const vueExtension = {};

vueExtension.install = function (Vue) {
    Vue.prototype.$filters = filters;
    Vue.prototype.$directives = directives;
    Vue.prototype.$utils = utils;
};

export default vueExtension;
