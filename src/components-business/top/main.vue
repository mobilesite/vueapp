<style lang="less">
    @import "./main.less";
</style>

<template>
    <div class="top">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <nav class="top-nav">
            <li><router-link to="/settings">Settings</router-link></li>
            <li><router-link to="/projects">Projects</router-link></li>
            <li><router-link to="/user/123">User</router-link></li>
        </nav>
    </div>
</template>

<script type="text/babel">
    export default{

    }
</script>
