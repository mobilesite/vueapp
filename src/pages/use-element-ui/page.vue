<style lang="less">
    @import "./page.less";
</style>

<template>
    <div>
        <div class="card" @click="onClick">hello, <span v-text="name"></span></div>
        <card msg="这是一个Vue组件~ "></card>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="text" @click="onClick">文字按钮</el-button>
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
