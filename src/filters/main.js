import Vue from 'vue';
import price from 'D:\\vueapp\\src\\filters\\price\\filter.js';
import price2 from 'D:\\vueapp\\src\\filters\\price2\\filter.js';
Vue.filter('price', price);
Vue.filter('price2', price2);
export default {
price,
price2,
};