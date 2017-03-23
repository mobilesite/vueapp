import isType from 'libs/is-type';
/* eslint-disable no-unused-vars */
import $ from 'zepto';
/* eslint-enable no-unused-vars */

import Vue from 'vue';
import Element from 'element-ui';

import Page from './page.vue';

Vue.use(Element);

/* eslint-disable no-debugger */
// debugger;
/* eslint-enable no-debugger */

/* eslint-disable no-console */
console.log(isType({}, Object));
/* eslint-enable no-console */

new Vue({// eslint-disable-line
    template: '<page></page>',
    replace: false,
    /**
     * 有了后面的.$mount('#page')，这里就可以不用写el: '#page'了，
     * 或者把后面那个.$mount('#page')删掉，保留el: '#page'亦可。
     * 即二者之中保留一个即可。
     */
    el: '#app',
    components: {
        Page
    }
});

