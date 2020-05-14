<template>
  <page id="role-setting">
    <el-form :inline="true" :model="searchForm">
      <el-form-item label="角色ID：">
        <el-input v-model="searchForm.role_id" placeholder="角色ID" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="角色名称：">
        <el-input v-model="searchForm.role_name" placeholder="角色名称" class="w140"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSearch" :loading="tableLoading">查询</el-button>
      </el-form-item>
    </el-form>

    <div class="handle-wrapper">
      <el-button type="primary" @click="openAddRoleDialog">新增角色</el-button>
    </div>
    <el-tabs :value="activeName" @tab-click="changeTab">
      <el-tab-pane label="角色列表" name="list" >
        <role-list
         @to-pane="toPane" 
         ref="role-list" 
         :loading.sync="tableLoading" 
         :dialogVisible.sync="dialogVisible1" 
         :handlerType.sync="handlerType"
         :dialogForm.sync="dialogForm"
         v-if="showList"
         >
        </role-list>
      </el-tab-pane>
        
      <el-tab-pane label="角色配置" name="config" :disabled="!selectedRole.role_id">
        <role-config :selectedRole.sync="selectedRole" v-if="showConfig">
        </role-config>
      </el-tab-pane>
    </el-tabs>
    <div class="pdtm10">
     
        
      
      <new-dialog
       v-model="dialogVisible1" 
       :title="handlerType === 'edit'? '修改' : '添加' + '角色'" 
       :confirm="confirmBtnEvent" 
       :modify="modifyBtnEvent" 
       :handlerType="handlerType"
       >
        <el-form :inline="false" :model="dialogForm" ref="dialogForm" label-width="85px" :rules="dialogFormRules">
          <el-form-item label="角色ID：" v-if="false">
            <el-input v-model.number="dialogForm.role_id" placeholder="角色ID" class="w140" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色名称：" prop="role_name">
            <el-input v-model="dialogForm.role_name" placeholder="角色名称" class="w140"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status" v-if="handlerType === 'edit'">
            <el-select v-model.number="dialogForm.status" placeholder="权限类型" class="w140">
                <el-option :label="item.label" :value="item.value" :key="`item.value-${index}`" v-for="(item, index) in statusList" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </new-dialog>
    </div>
  </page>
</template>

<script>
import roleList from './role-list.vue';
import { addRole, updateRole } from '@/http';
import { confirmTips, validate } from "@/decorator";

const ADD = 'add';
const EDIT = 'edit'
const dialogForm = {
        role_id: "",
        role_name: "",
        status: 0,
      }
export default {
  components: {
    'role-list':  () => import('./role-list.vue'),
    'role-config': () => import('./role-config.vue'),
  },
  data() {
    return {
      tableLoading: false,
      selectedRole: {},
      dialogVisible1: false,
      handlerType: '',
      showConfig: false,
      showList: false,
      searchForm: {
        role_id: "",
        role_name: ""
      },
      dialogForm: dialogForm,
      
      statusList: [
        {
          label: '启用',
          value: 0
        }, {
          label: '禁用',
          value: 1
        }
      ],

      dialogFormRules: {
        role_name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }]
      }

    };
  },
  computed: {
    activeName() {
      return this.$route.hash.slice(1) || 'list'
    }

  },
  watch: {
    'selectedRole.role_id'(newVal, oldaVal) {
      if(newVal !== oldaVal) {
        this.showConfig = false;

        this.$nextTick(() => {
          this.showConfig = true;
        })
      }
    },
    activeName(newVal) {

      if(newVal === 'list' && this.showList === false) {
        this.showList = true;
      }
    }
  },
  methods: {
    formSearch() {
      this.$refs['role-list'].initQueryRoleByPage({
        ...this.searchForm
      })
    },
    openAddRoleDialog() {
      
      this.dialogVisible1 = true;
      this.handlerType = ADD;
      this.dialogForm = {...dialogForm};
    },
    changeTab(tab) {
      var params = {
        hash: tab.paneName,
        query: {}
      }
      if(this.selectedRole.role_id && tab.paneName === 'config') {
        params.query.id = this.selectedRole.role_id;
      }
      this.$router.push(params)
    },
    toPane(newVal) {
      this.selectedRole = {...newVal};
      this.$router.push({
        hash: 'config',
        query: {id: newVal.role_id}
      })
    },
    submitAddRole(params, resolve, reject) {
      addRole(params).then(res => {
        if(res.success) {
          this.$message.success('添加成功');
          resolve();
          this.$refs['role-list'].queryRoleByPage();
        }
        reject()
      })
    },
    submitUpdateRole(params, resolve, reject) {
      updateRole(params).then(res => {
        if(res.success) {
          this.$message.success('修改成功');
          resolve();
          this.$refs['role-list'].queryRoleByPage();
        }
        reject()
      })
    },
    @validate('dialogForm')
    confirmBtnEvent(...args) {
      this.submitAddRole({role_name: this.dialogForm.role_name}, ...args);
    },
    @validate('dialogForm')
    modifyBtnEvent(...args) {
      this.submitUpdateRole({...this.dialogForm}, ...args);
    }
  },
  created() {
    if(this.$route.hash === '#config') {
      setTimeout(() => {
          this.showConfig = true;
      }, 1000);
    } else {
      this.showList = true;
    }

  },

};
</script>

<style>
</style>