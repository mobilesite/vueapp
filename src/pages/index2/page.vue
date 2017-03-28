<style lang="less">
    /**
    * Module not found: Error: Can't resolve 'fonts/element-icons.woff?
    http://vue-loader.vuejs.org/en/configurations/asset-url.html
    file-loader allows you to designate where to copy and place the asset file, and how to name it using version hashes for better caching. Moreoever, this also means you can just place images next to your *.vue files and use relative paths based on the folder structure instead of worrying about deployment URLs. With proper config, Webpack will auto-rewrite the file paths into correct URLs in the bundled output.
    详见：https://github.com/ElementUI/theme-default/issues/5
    解决办法：将node_modules/element-ui/lib下面的theme-default文件夹拷贝到与page.vue平级的目录下，
    然后在page.vue的style中以@import './theme-default/index.css'引入目标文件
    */
    @import './theme-default/index.css';
    @import "./page.less";
</style>

<template>
    <div>
        <div class="card">hello, <span v-text="name"></span></div>
        <card msg="这是一个Vue组件~ "></card>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="text" @click="onClick">文字按钮</el-button>

        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>

        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>

<script type="text/babel">
    import Card from 'normal/card/main';

    export default{
        components: {
            Card
        },
        data() {
            return {
                name: 'dennis'
            };
        },
        methods: {// 注意这里是methods而不是method
            /* eslint-disable no-alert */
            onClick: () => alert('Do not touch me!')
            /* eslint-enable no-alert */
        }
    };
</script>
