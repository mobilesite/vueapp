<style lang="less">
    .projects{
        color: #333;
    }
</style>

<template>
    <div>
        <p class="projects">This is <span style="color: red;">user</span> view. And your user id is <span v-text="$route.params.id"></span>.</p>

        <h2>User <span v-text="$route.params.id"></span></h2>
        <router-view></router-view>
    </div>
</template>

<script type="text/babel">
    export default{
        watch: {
            '$route'(to, from) { // eslint-disable-line
                // 在这里可以对路由变化作出响应
                /* eslint-disable no-console */
                console.log('to:', to);
                console.log('from:', from);
                console.log(`the id is changed from ${from.params.id} to ${to.params.id}`);
                /* eslint-enable no-console */
            }
        }
    };
</script>
