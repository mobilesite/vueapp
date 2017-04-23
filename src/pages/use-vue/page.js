import Vue from 'ext';
import Page from './page.vue';

/* eslint-disable no-console */
console.log(`${Vue}`);
/* eslint-enable no-console */

Vue.config.debug = true;// 开启debug模式

new Vue({// eslint-disable-line
    template: '<page></page>',
    replace: false,
    el: '#page',
    components: {
        Page
    }
});
