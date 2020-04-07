<template>
    <div>
        <p>page5A</p>
        <el-button @click="printInfo">打印信息</el-button>
    </div>
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
        click() {
            alert('click66566')
        },
        printInfo() {
            this.$router.push({
                path: '/page1',
                // name: 'pageNum',
                query: {a: this.count},
                // params: {b: '307'}
            })
            this.count++;
        }
    }
}
</script>

<style>

</style>