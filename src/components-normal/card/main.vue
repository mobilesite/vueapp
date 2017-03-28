<style lang="less">
    .card{
        color: #333;
    }
</style>

<template>
    <p class="card">hi,<span v-text="msg"></span></p>
</template>

<script type="text/babel">
    export default{
        props: ['msg']
    };
</script>
