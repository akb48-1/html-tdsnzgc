<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="分类ID：">
        <el-input v-model="searchForm.classify_id" placeholder="分类ID" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="分类名称：">
        <el-input v-model="searchForm.classify_name" placeholder="分类名称" class="w140"></el-input>
      </el-form-item>
      <!-- <el-form-item label="父类ID：">
        <el-input v-model="searchForm.classify_id" placeholder="父类ID" class="w140"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="formSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="handle-wrapper">
      <el-button type="primary" @click="openAddClassifyDialog">新增分类</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading" class="mt10">
      <el-table-column label="序号" width="70" >
        <template slot-scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="classify_id" label="分类id" ></el-table-column>
      <el-table-column prop="classify_name" label="分类名称" ></el-table-column>
      <!-- <el-table-column prop="parent_classify_id" label="父类id"></el-table-column> -->
      <el-table-column label="操作" width="120">
            <template slot-scope="scope">
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


    <new-dialog
       v-model="dialogVisible" 
       :title="handlerType === 'edit'? '修改' : '添加' + '分类'" 
       :confirm="confirmBtnEvent"
       :modify="modifyBtnEvent"  
       :handlerType="handlerType"
       >
        <el-form :inline="false" :model="dialogForm" ref="dialogForm" label-width="85px" :rules="dialogFormRules">
          <el-form-item label="分类ID：" v-if="false">
            <el-input v-model.number="dialogForm.classify_id" placeholder="分类ID" class="w140" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="分类名称：" prop="classify_name">
            <el-input v-model="dialogForm.classify_name" placeholder="分类名称" class="w140"></el-input>
          </el-form-item>
          <!-- <el-form-item label="父分类ID：" prop="classify_key"> -->
            <!-- <el-input v-model="dialogForm.classify_key" placeholder="父分类" class="w140"></el-input> -->
          <!-- </el-form-item> -->
          
        </el-form>
      </new-dialog>

  </div>
</template>

<script>
import { queryAllClassify, queryClassifyByPage, addClassify, updateClassify } from '@/http'
import { confirmTips, validate } from "@/decorator";

const ADD = 'add';
const EDIT = 'edit';
const dialogForm = {
        classify_id: "",
        classify_name: "",
        parent_classify_id: null,
        organ_id: null,
      }

export default {

  data() {
    return {
      searchForm: {
        classify_id: "",
        classify_name: "",
      },
      tableData: [],
      searchFormData: {},
      loading: false,
      dialogForm: dialogForm,
      dialogVisible: false,
      handlerType: '',

      dialogFormRules: {
        classify_name: [{ required: true, message: "请输入分类名称", trigger: "blur" }],
      }
    };
  },
  methods: {
    editInfo(item) {

      this.dialogVisible = true;
      this.handlerType = 'edit';
      this.dialogForm = {...item};
    },
    openAddClassifyDialog() {
      
      this.dialogVisible = true;
      this.handlerType = ADD;
      this.dialogForm = {...dialogForm};
    },

    handleCurrentChange(pageNo) {
      this.queryClassifyByPage()
    },
    formSearch(params = {}) {
      this.searchFormData = this.searchForm;

      this.$refs.pagination.update({
        pageNo: 1
      })

      this.queryClassifyByPage();
    },
    queryClassifyByPage(params = {}) {
      this.loading = true;

      queryClassifyByPage({
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
      this.queryClassifyByPage();
    },

    submitAddClassify(params, resolve, reject) {
      console.log(params)
      addClassify(params).then(res => {
        if(res.success) {
          this.$message.success('添加成功');
          resolve();
          this.queryClassifyByPage();
        }
        reject()
      })
    },
    submitUpdateClassify(params, resolve, reject) {

      updateClassify(params).then(res => {
        if(res.success) {
          this.$message.success('修改成功');
          resolve();
          this.queryClassifyByPage();
        }
        reject()
      })
    },
    @validate('dialogForm')
    confirmBtnEvent(...args) {
      this.submitAddClassify({...this.dialogForm}, ...args);
    },
    @validate('dialogForm')
    modifyBtnEvent(...args) {
      this.submitUpdateClassify({...this.dialogForm}, ...args);
    }
  },
  created() {

      console.log(this)
      setTimeout(() => {
          this.init();
      }, 500)
  }
};
</script>

<style>
</style>