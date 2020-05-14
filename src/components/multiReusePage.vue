
<script>
export default {
    data() {
        return {
            $pageList: [],
        }
    },
    watch: {
        '$route.query.id'(newVal) {
            if(newVal != undefined && this.$data.$pageList.indexOf(''+newVal) == -1) {
                this.$data.$pageList.push(''+newVal)
            }
        }
    },
    methods: {
        $$open() {

        },
        $$new() {

        }
    },
    created() {
        setTimeout(() => {
            this.$data.$pageList.push(''+this.$route.query.id)
        }, 50);
        
    }
}


</script>