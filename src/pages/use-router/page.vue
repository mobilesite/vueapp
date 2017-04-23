<style lang="less">
    @import "./page.less";
</style>

<template>
    <div class="page">
        <!--<div class="card">hello, <span v-text="name"></span></div>-->
        <!--<card msg="这是一个Vue组件~ "></card>-->
        <!--<el-button>默认按钮</el-button>-->
        <!--<el-button type="primary">主要按钮</el-button>-->
        <!--<el-button type="text" @click="onClick">文字按钮</el-button>-->

        <div>
            <Top></Top>
            <Left></Left>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <!-- 可以用name属性对router-view进行命名，没有指定name的router-view默认为default -->
            <transition name="slide-right">
                <router-view class="view central"></router-view>
            </transition>
        </div>
    </div>
</template>

<script type="text/babel">
//    import Card from 'normal/card/main';
    import Top from 'business/top/main';
    import Left from 'business/left/main';

    export default{
        components: {
            Top,
            Left,
//            Card
        },
//        data() {
//            return {
//                name: 'dennis'
//            }
//        },
        methods: { // 注意这里是methods而不是method
            /* eslint-disable no-alert */
            onClick: () => alert('Do not touch me!')
            /* eslint-enable no-alert */
        }
    };
</script>
