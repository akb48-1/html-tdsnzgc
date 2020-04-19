<template>
  <el-pagination
          
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="layout"
          :total="total"
          :disabled="loading"
        ></el-pagination>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: false,
            default: () => {}
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            layout: 'total, sizes, prev, pager, next, jumper',
            pageSizes: [10, 20, 50, 100, 200],
            total: 0,
            currentPage: 1,
            pageSize: 10,
            pageNo: 1,
        }
    },
    methods: {
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
            this.$emit('size-change');
        },
        handleCurrentChange(pageNo) {
            this.pageNo = pageNo;
            this.$emit('current-change');
        },
        update(info) {
            info.pageNo != null && (this.pageNo = info.pageNo);
            info.currentPage != null && (this.currentPage = info.currentPage);
            info.pageSize != null && (this.pageSize = info.pageSize);
            info.total != null && (this.total = info.total);
        }
    },
    created() {
    }
}
</script>

<style>

</style>