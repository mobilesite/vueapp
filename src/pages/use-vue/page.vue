<style lang="less">
    @import "./page.less";
</style>

<template>
    <div>
        <!--
        值得注意的是，template下只能包含一个子标签，而不能是两个或多个，否则会报错：
        Component template should contain exactly one root element.
        If you are using v-if on multiple elements, use v-else-if to chain them instead.
        -->
        <div class="card" @click="onClick">hello, <span v-text="name"></span></div>
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
            return {
                name: 'dennis'
            }
        },
        methods: { //注意这里是methods而不是method
            onClick: () => alert('Do not touch me!')
        }
    }
</script>
