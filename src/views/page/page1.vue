<template>
    <div>page1A</div>
</template>

<script>
export default {
    name: 'page5',
    data() {
        return {
            count: 1
        }
    },
    methods: {
        
    },
    created() {
        console.log(this.count++);
    },
    watch: {
        '$route' (to, from) {
            // 对路由变化作出响应...
            console.log(to.path)
            console.log(to.meta)
        }
    }
}
</script>