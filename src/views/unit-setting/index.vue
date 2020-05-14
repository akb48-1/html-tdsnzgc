<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm" ref="qaqa" :rules="dialogFormRules">
      <el-form-item label="单位ID：" prop="unit_id">
        <el-input v-model="searchForm.unit_id" placeholder="单位ID" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="单位名称：" prop="unit_name">
        <el-input v-model="searchForm.unit_name" placeholder="单位名称" class="w140"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="handle-wrapper">
      <el-button type="primary" @click="openAddUnitDialog">新增单位</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading" class="mt10">
      <el-table-column label="序号" width="70" >
        <template scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="unit_id" label="单位id" width="180"></el-table-column>
      <el-table-column prop="unit_name" label="单位名称" width="180"></el-table-column>
      <el-table-column prop="unit_key" label="单位KEY"></el-table-column>
    </el-table>

    <new-pagination
      :loading="loading"
      class="pdtm10"
      style="text-align: right;"
      ref="pagination"
      @current-change="handleCurrentChange"
    ></new-pagination>


    <new-dialog
       v-model="dialogVisible" 
       title="添加单位" 
       :confirm="confirmBtnEvent" 
       :handlerType="handlerType"
       >
        <el-form :inline="false" :model="dialogForm" ref="dialogForm" label-width="85px" :rules="dialogFormRules">
          <el-form-item label="单位ID：" v-if="false">
            <el-input v-model.number="dialogForm.unit_id" placeholder="单位ID" class="w140" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="单位名称：" prop="unit_name">
            <el-input v-model="dialogForm.unit_name" placeholder="单位名称" class="w140"></el-input>
          </el-form-item>
          <el-form-item label="单位KEY：" prop="unit_key">
            <el-input v-model="dialogForm.unit_key" placeholder="单位KEY" class="w140"></el-input>
          </el-form-item>
        </el-form>
      </new-dialog>

  </div>
</template>

<script>
import { queryUnitByPage, addUnit } from '@/http'
import { confirmTips, validate } from "@/decorator";


const ADD = 'add';
const EDIT = 'edit';
const dialogForm = {
        unit_id: "",
        unit_name: "",
        unit_key: ''
      }

export default {
  data() {
    return {
      searchForm: {
        unit_id: "",
        unit_name: ""
      },
      tableData: [],
      searchFormData: {},
      loading: false,
      dialogForm: dialogForm,
      dialogVisible: false,
      handlerType: '',

      dialogFormRules: {
        unit_name: [{ required: true, message: "请输入单位名称", trigger: "change" }],
        unit_key: [{ required: true, message: "请输入单位KEY", trigger: "change" }],
        unit_id: [{ required: true, message: "请输入单位id", trigger: "change" }],
      }
    };
  },
  methods: {

    openAddUnitDialog() {
      
      this.dialogVisible = true;
      this.handlerType = ADD;
      this.dialogForm = {...dialogForm};
    },

    handleCurrentChange(pageNo) {
      this.queryUnitByPage()
    },

    formSearch(params = {}) {
      this.searchFormData = this.searchForm;

      this.$refs.pagination.update({
        pageNo: 1
      })

      this.queryUnitByPage();
    },
    queryUnitByPage(params = {}) {
      this.loading = true;

      queryUnitByPage({
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
      this.queryUnitByPage();
    },

    submitAddUnit(params, resolve, reject) {
      console.log(params)
      addUnit(params).then(res => {
        if(res.success) {
          this.$message.success('添加成功');
          resolve();
          this.queryUnitByPage();
        }
        reject()
      })
    },
    @validate('dialogForm')
    confirmBtnEvent(...args) {
      this.submitAddUnit({...this.dialogForm}, ...args);
    },
    
  },
  created() {
      setTimeout(() => {
          this.init();
      }, 100)
  }
};
</script>

<style>
</style>