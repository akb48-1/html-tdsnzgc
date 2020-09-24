<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="表单ID：">
        <el-input v-model="searchForm.form_id" placeholder="表单ID" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="表单名称：">
        <el-input v-model="searchForm.form_name" placeholder="表单名称" class="w140"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="handle-wrapper">
      <el-button type="primary" @click="openAddOrganDialog">新增表单</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading" class="mt10">
      <el-table-column label="序号" width="70" >
        <template slot-scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="form_name" label="表单名称" width="180"></el-table-column>
      <el-table-column prop="create_time" label="创建时间"></el-table-column>
      <el-table-column prop="createer_name" label="创建人"></el-table-column>
      <el-table-column prop="update_time" label="修改时间"></el-table-column>
      <el-table-column prop="updateer_name" label="修改人"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope" >{{statusList.find(item => item.value === scope.row.status).label }}</template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="viewDetail(scope.row)" type="primary" size="mini" icon="el-icon-view"></el-button>
          <el-button @click="editInfo(scope.row)" type="warning" size="mini" icon="el-icon-edit"></el-button>
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
import { queryOrganByPage, addOrgan, updateOrgan } from '@/http'
import { confirmTips, validate } from "@/decorator";
import { baseURL } from "@/http/axios";

const ADD = 'add';
const EDIT = 'edit';


export default {
  
  data() {
    return {
      EDIT: EDIT,
      headers: {
        token: localStorage.getItem('token')
      },
      baseURL: baseURL,
      searchForm: {
        form_id: "",
        form_name: ""
      },
      tableData: [],
      searchFormData: {},
      loading: false,
      handlerType: '',
      statusList: [
        {
          label: '正常',
          value: 0
        }, {
          label: '作废',
          value: 1
        }
      ],
    };
  },
  methods: {
    viewDetail(item) {
        console.log(item)
        this.$router.push({
          path: '/form-detail',
          params: {
            type: 'add'
          }
        })
    },
    editInfo(item) {

      // this.handlerType = this.EDIT;
      // this.dialogForm = {...item};
    },
    openAddOrganDialog() {
      
      // this.handlerType = ADD;
      // this.dialogForm = {...dialogForm};
    },

    handleCurrentChange(pageNo) {
      this.queryOrganByPage()
    },
    formSearch(params = {}) {
      this.searchFormData = this.searchForm;

      this.$refs.pagination.update({
        pageNo: 1
      })

      this.queryOrganByPage();
    },
    queryOrganByPage(params = {}) {
      this.loading = true;

      queryOrganByPage({
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

      }).finally(() => {
        this.loading = false;
      })
    },

    init() {
      this.queryOrganByPage();
    },

  },
  created() {

      setTimeout(() => {
          this.init();
      }, 500)
  }
};
</script>

<style lang="scss" scoped>
.avatar {
    // width: 178px;
    // height: 178px;
    width: 100%;
    display: block;
  }
</style>