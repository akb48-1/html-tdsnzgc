<template>
  <div class="page">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="分店ID：">
        <el-input v-model="searchForm.organ_id" placeholder="分店ID" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="分店名称：">
        <el-input v-model="searchForm.organ_name" placeholder="分店名称" class="w140"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSearch" :loading="loading">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="handle-wrapper">
      <el-button type="primary" @click="openAddOrganDialog">新增分店</el-button>
    </div>

    <el-table :data="tableData" border style="width: 100%" v-loading="loading" class="mt10">
      <el-table-column label="序号" width="70" >
        <template slot-scope="scope"><span>{{scope.$index+($refs.pagination.pageNo - 1) * $refs.pagination.pageSize + 1}} </span></template>
      </el-table-column>
      <el-table-column prop="organ_name" label="分店名称" width="180"></el-table-column>
      <el-table-column prop="organ_tel" label="分店电话" width="180"></el-table-column>
      <el-table-column prop="organ_address" label="分店地址" width="180"></el-table-column>
      <el-table-column prop="organ_create_time" label="成立时间"></el-table-column>
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


    <new-dialog
       v-model="dialogVisible" 
       :title="handlerType === EDIT? '修改' : '添加' + '分店'" 
       :confirm="confirmBtnEvent" 
       :modify="modifyBtnEvent" 
       :handlerType="handlerType"
       >
        <el-form :inline="false" :model="dialogForm" ref="dialogForm" label-width="85px" :rules="dialogFormRules">
          <el-form-item label="分店ID：" v-if="false">
            <el-input v-model.number="dialogForm.organ_id" placeholder="分店ID" class="w140" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="分店名称：" prop="organ_name">
            <el-input v-model="dialogForm.organ_name" placeholder="分店名称" class="w140"></el-input>
          </el-form-item>
          <el-form-item label="分店地址：" prop="organ_address">
            <el-input v-model="dialogForm.organ_address" placeholder="分店地址" class="w140"></el-input>
          </el-form-item>
          <el-form-item label="成立时间：" prop="organ_create_time">
            <el-date-picker
              class="w140"
              v-model="dialogForm.organ_create_time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="描述：" prop="organ_desc">
            <el-input v-model="dialogForm.organ_desc" placeholder="描述" class="w140"></el-input>
          </el-form-item>
          <el-form-item label="分店图片：" prop="organ_picture">
            <el-upload
              class="avatar-uploader"
              action="/api/file/uploadImg"
              name="file"
              :headers="headers"
              :data="{type: 'organ'}"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="dialogForm.organ_picture" :src="baseURL + dialogForm.organ_picture" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <el-input v-model="dialogForm.organ_picture" placeholder="分店图片" class="w140"></el-input>
          </el-form-item>
          <el-form-item label="分店电话：" prop="organ_tel">
            <el-input v-model="dialogForm.organ_tel" placeholder="分店电话" class="w140"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status" v-if="handlerType === EDIT">
            <el-select v-model.number="dialogForm.status" placeholder="权限类型" class="w140">
                <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in statusList" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </new-dialog>
  </div>
</template>

<script>
import { queryOrganByPage, addOrgan, updateOrgan } from '@/http'
import { confirmTips, validate } from "@/decorator";
import { baseURL } from "@/http/axios";

const ADD = 'add';
const EDIT = 'edit';
const dialogForm = {
        organ_id: "",
        organ_name: "",
        organ_address: '',
        organ_create_time: '',
        organ_desc: '',
        organ_picture: '',
        organ_tel: '',
        status: 0,
      }

export default {
  
  data() {
    return {
      EDIT: EDIT,
      headers: {
        token: localStorage.getItem('token')
      },
      baseURL: baseURL,
      searchForm: {
        organ_id: "",
        organ_name: ""
      },
      tableData: [],
      searchFormData: {},
      loading: false,
      dialogForm: dialogForm,
      dialogVisible: false,
      handlerType: '',
      statusList: [
        {
          label: '正常运营',
          value: 0
        }, {
          label: '暂停运营',
          value: 1
        }
      ],
      dialogFormRules: {
        organ_name: [{ required: true, message: "请输入分店名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if(!res.success) {
        this.$message.error(res.message)
      } else {
        this.dialogForm.organ_picture = res.data.url
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      return isJPG && isLt2M;
    },
    viewDetail(item) {
        console.log(item)
    },
    editInfo(item) {

      this.dialogVisible = true;
      this.handlerType = this.EDIT;
      this.dialogForm = {...item};
    },
    openAddOrganDialog() {
      
      this.dialogVisible = true;
      this.handlerType = ADD;
      this.dialogForm = {...dialogForm};
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

    submitAddOrgan(params, resolve, reject) {
      if(params.organ_create_time === '') {
        params.organ_create_time = null;
      }
      addOrgan(params).then(res => {
        if(res.success) {
          this.$message.success('添加成功');
          resolve();
          this.queryOrganByPage();
        }
        reject()
      })
    },
    submitUpdateOrgan(params, resolve, reject) {
      if(params.organ_create_time === '') {
        params.organ_create_time = null;
      }
      updateOrgan(params).then(res => {
        if(res.success) {
          this.$message.success('修改成功');
          resolve();
          this.queryOrganByPage();
        }
        reject()
      })
    },

    @validate('dialogForm')
    confirmBtnEvent(...args) {
      this.submitAddOrgan({...this.dialogForm}, ...args);
    },
    @validate('dialogForm')
    modifyBtnEvent(...args) {
      this.submitUpdateOrgan({...this.dialogForm}, ...args);
    }
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