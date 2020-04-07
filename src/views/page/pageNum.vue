<template>
    <div>page {{a}}  {{b}}</div>
</template>



<script>
export default {
    data() {
        return {}
    },
    computed: {
        a() {
            return this.$route.query.a
        },
        b() {
            return this.$route.params.b
        }
    },
    created() {
        console.log(this.$route)
    }
}
</script>

<style>

</style>