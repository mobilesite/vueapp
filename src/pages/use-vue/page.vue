<style lang="less">
    @import "./page.less";
</style>

<template>
    <div class="page">
        <!--
        值得注意的是，template下只能包含一个子标签，而不能是两个或多个，否则会报错：
        Component template should contain exactly one root element.
        If you are using v-if on multiple elements, use v-else-if to chain them instead.
        -->
        <div class="card" @click="onClick">
            <span v-text="name"></span><span>当前价格:</span><span class="price">{{price | price(2)}}</span>
        </div>
        <card msg="这是一个Vue组件~ "></card>
    </div>
</template>

<script type="text/babel">
    import Card from 'normal/card/main';

    export default{
        components: {
            Card
        },
        data() {
            /* eslint-disable no-console */
//            console.log(this.$filters.price(5500, 2));// 通过函数的方式调用filter
//            this.$utils.storage.remove('aaa');
            /* eslint-enable no-console */

            return {
                name: 'iPhone7',
                price: 5500
            };
        },
        methods: { // 注意这里是methods而不是method
            /* eslint-disable no-alert */
            onClick: () => alert('Do not touch me!')
            /* eslint-enable no-alert */
        }
    };
</script>
