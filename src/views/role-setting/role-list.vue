<template>
  <div class="page">
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column label="序号" width="70" >
        <template slot-scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="role_name" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="createer_name" label="创建人"></el-table-column>
      <el-table-column prop="update_time" label="修改时间"></el-table-column>
      <el-table-column prop="updateer_name" label="修改人"></el-table-column>
      <el-table-column fixed="right" label="操作" width="190">
        <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row)" type="primary" size="mini" icon="el-icon-view"></el-button>
          <el-button @click="editInfo(scope.row)" type="warning" size="mini" icon="el-icon-edit"></el-button>
          <el-button @click="removeInfo(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <new-pagination
      :loading="loading"
      class="pdtm10"
      style="text-align: right;"
      ref="pagination"
      @current-change="handleCurrentChange"
    ></new-pagination>
  </div>
</template>

<script>
import { queryRoleByPage, deleteRole } from '@/http'
import { confirmAsyncTips } from "@/decorator"

export default {
    props: {
        selectedRole: {
            type: Object
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
  data() {
    return {
      tableData: [],
      searchFormData: {},
    };
  },
  methods: {
    viewDetail(item) {
        this.$emit('to-pane', {...item})
    },
    editInfo(item) {
      console.log(item);
      this.$emit('update:dialogVisible', true)
      this.$emit('update:handlerType', 'edit')
      this.$emit('update:dialogForm', {...item})
    },

    @confirmAsyncTips()
    removeInfo(item) {
      return deleteRole(item.role_id).then(res => {
        if(res.success) {
          this.$message.success('删除成功');
          this.queryRoleByPage()
          Promise.resolve()
        }
      })
    },
    handleCurrentChange(pageNo) {
      this.queryRoleByPage()
    },
    initQueryRoleByPage(params = {}) {
      this.searchFormData = params;

      this.$refs.pagination.update({
        pageNo: 1
      })

      this.queryRoleByPage(params);
    },
    queryRoleByPage(params = {}) {
      this.$emit('update:loading', true);

      queryRoleByPage({
        pageNo: this.$refs.pagination.pageNo,
        pageSize: this.$refs.pagination.pageSize,
        ...this.searchFormData,
        ...params
      }).then(res => {

        this.$refs.pagination.update({
          pageNo: res.data.pageNo,
          currentPage: res.data.pageNo,
          pageSize: res.data.pageSize,
          total: res.data.total
        })

        this.tableData = res.data.list;

        console.log(this.$refs.pagination)
      }).finally(() => {
        this.$emit('update:loading', false);
      })
    },

    init() {
      this.queryRoleByPage();
    }
  },
  created() {

      setTimeout(() => {
          this.init();
      }, 500)
  }
};
</script>

<style>
</style>