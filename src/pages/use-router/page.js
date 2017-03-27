import isType from 'libs/is-type';
/* eslint-disable no-unused-vars */
import $ from 'zepto';
/* eslint-enable no-unused-vars */

import Vue from 'vue';
import VueRouter from 'vue-router';
import Element from 'element-ui';

import Page from './page.vue';
// 1. 定义（路由）组件
import Settings from 'business/settings/main';
import Projects from 'business/projects/main';
import User from 'business/user/main';
import Central from 'business/central/main';
import UserProfile from 'business/user-profile/main';
import UserPosts from 'business/user-posts/main';
import UserHome from 'business/user-home/main';
import PageNotFound from 'business/page-not-found/main';

Vue.use(VueRouter);
Vue.use(Element);

// 2. 定义路由：每个路由应该映射一个组件
const routes = [
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '/projects',
        component: Projects
    },
    {
        path: '/user/:id',
        component: User,
        children: [
            {
                // 当 /user/:id/profile 匹配成功，
                // UserProfile 会被渲染在 User 的 <router-view> 中
                path: 'profile',
                component: UserProfile
            },
            {
                // 当 /user/:id/posts 匹配成功
                // UserPosts 会被渲染在 User 的 <router-view> 中
                path: 'posts',
                component: UserPosts
            },
            {
                // 当 /user/:id 匹配成功，
                // UserHome 会被渲染在 User 的 <router-view> 中
                path: '',
                component: UserHome
            }
        ]
    },
    {
        path: '*',
        component: PageNotFound
    }
];

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes,
    // mode: 'history', // vue-router 默认hash模式，这会使得地址栏很难看 // todo 生产环境改成history模式
});

router.beforeEach((to, from, next) => {
    /* eslint-disable no-console */
    console.log(to);
    /* eslint-enable no-console */
    next(); // 这里next()必不可少
});

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
    // el: '#page',
    components: {
        Page
    },
    router,
    data(){
        return {
            error: '',
            post: null
        };
    },
    created(){
        this.fetchData();
    },
    methods: {
        fetchData() {

        }
    }
}).$mount('#page');

/* eslint-disable no-debugger */
// debugger;
// router.push({
//     path: 'user/123',
//     query: { q: 'abc' }
// });// 这样就可以跳转到指定的路由user/123?q=abc

// // 命名的路由的跳转
// router.push({
//     name: 'user',
//     params: {
//         id: 123
//     },
//     query: { q: 'abc' }
// });
/* eslint-disable no-debugger */

