import Vue from 'vue';
import Page from './page.vue';

Vue.config.debug = true;// 开启debug模式

new Vue({// eslint-disable-line
    template: '<page></page>',
    replace: false,
    el: '#page',
    components: {
        Page
    }
});

