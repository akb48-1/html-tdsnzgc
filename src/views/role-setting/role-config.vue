<template>
  <div>
    <el-form label-width="60px" class="demo-ruleForm pd10" :inline="true" :disabled="true" >
      <el-form-item label="角色名：">
        <el-input type="text" :value="roleInfo.role_name" class="w140"></el-input>
      </el-form-item>
      <el-form-item label="状态：">
        <el-input type="text" :value="roleInfo.status === 0? '正在启用' : '已禁用'" class="w140"></el-input>
      </el-form-item>
    </el-form>

    <div class="pd10">
        <el-card class="box-card topTable">
        已拥有权限
        <el-form :inline="true" :model="searchForm">
            <el-form-item label="权限ID：">
            <el-input v-model="searchForm.permission_id" placeholder="权限ID" class="w140"></el-input>
            </el-form-item>
            <el-form-item label="父菜单ID：">
            <el-input v-model="searchForm.parent_menu_id" placeholder="父菜单ID" class="w140"></el-input>
            </el-form-item>
            <el-form-item label="权限名称：">
            <el-input v-model="searchForm.permission_name" placeholder="权限名称" class="w140"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="formSearch" :loading="loading">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="usePermissionData" border style="width: 100%" v-loading="loading">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="permission_id" label="权限ID"></el-table-column>
            <el-table-column prop="parent_menu_id" label="父菜单ID"></el-table-column>
            <el-table-column prop="permission_name" label="权限名称"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="createer_name" label="创建人"></el-table-column>
            <el-table-column prop="update_time" label="修改时间"></el-table-column>
            <el-table-column prop="updateer_name" label="修改人"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="removePermission(scope.row)" type="danger" size="mini">移除</el-button>
            </template>
            </el-table-column>
        </el-table>

        <new-pagination
            :loading="loading"
            class="pdtm10"
            style="text-align: right;"
            ref="pagination1"
            @current-change="queryUsePermissionData"
        ></new-pagination>
        </el-card>
    </div>
    <div class="pd10">
        <el-card class="box-card bottomTable">
        未拥有权限
        <el-form :inline="true" :model="searchForm2">
            <el-form-item label="权限ID：">
            <el-input v-model="searchForm2.permission_id" placeholder="权限ID" class="w140"></el-input>
            </el-form-item>
            <el-form-item label="父菜单ID：">
            <el-input v-model="searchForm2.parent_menu_id" placeholder="父菜单ID" class="w140"></el-input>
            </el-form-item>
            <el-form-item label="权限名称：">
            <el-input v-model="searchForm2.permission_name" placeholder="权限名称" class="w140"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="formSearch2" :loading="loading2">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="unUsePermissionData" border style="width: 100%" v-loading="loading2">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="permission_id" label="权限ID"></el-table-column>
            <el-table-column prop="parent_menu_id" label="父菜单ID"></el-table-column>
            <el-table-column prop="permission_name" label="权限名称"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
            <el-table-column prop="createer_name" label="创建人"></el-table-column>
            <el-table-column prop="update_time" label="修改时间"></el-table-column>
            <el-table-column prop="updateer_name" label="修改人"></el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button @click="addPermission(scope.row)" type="primary" size="mini">添加</el-button>
            </template>
            </el-table-column>
        </el-table>

        <new-pagination
            :loading="loading2"
            class="pdtm10"
            style="text-align: right;"
            ref="pagination2"
            @current-change="queryUnUsePermissionData"
        ></new-pagination>
        </el-card>
    </div>
  </div>
</template>

<script>
import {
  queryUsingPermissionByRoleId,
  queryUnUsingPermissionByRoleId,
  addPermissionByRoleId,
  removePermissionByRoleId,
  queryRoleById
} from "@/http";

export default {
  data() {
    return {
      usePermissionData: [],
      unUsePermissionData: [],

      loading: false,
      loading2: false,
      searchForm: {
        permission_id: "",
        parent_menu_id: "",
        permission_name: ""
      },
      searchForm2: {
        permission_id: "",
        parent_menu_id: "",
        permission_name: ""
      },
      searchFormData: {},
      searchFormData1: {},
      roleInfo: {}
    };
  },
  props: {
    selectedRole: {
      type: Object,
      default: null
    }
  },
  watch: {
    selectedRole: {
      deep: true,
      handler() {
        this.reset = true;
      }
    }
  },
  methods: {
    formSearch() {
      this.searchFormData1 = { ...this.searchForm };
      this.queryUsePermissionData();
    },
    formSearch2() {
      this.searchFormData2 = { ...this.searchForm2 };
      this.queryUnUsePermissionData();
    },
    queryUsePermissionData(params = {}) {
      this.loading = true;
      queryUsingPermissionByRoleId(this.roleInfo.role_id, {
        pageNo: this.$refs.pagination1.pageNo,
        pageSize: this.$refs.pagination1.pageSize,
        ...this.searchFormData1
      })
        .then(res => {
          if (res.success) {
            this.usePermissionData = res.data.list;

            this.$refs.pagination1 &&
              this.$refs.pagination1.update({
                pageNo: res.data.pageNo,
                currentPage: res.data.pageNo,
                pageSize: res.data.pageSize,
                total: res.data.total
              });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    queryUnUsePermissionData(params = {}) {
      this.loading2 = true;
      queryUnUsingPermissionByRoleId(this.roleInfo.role_id, {
        pageNo: this.$refs.pagination2.pageNo,
        pageSize: this.$refs.pagination2.pageSize,
        ...this.searchFormData2
      })
        .then(res => {
          if (res.success) {
            this.unUsePermissionData = res.data.list;

            this.$refs.pagination2 &&
              this.$refs.pagination2.update({
                pageNo: res.data.pageNo,
                currentPage: res.data.pageNo,
                pageSize: res.data.pageSize,
                total: res.data.total
              });
          }
        })
        .finally(() => {
          this.loading2 = false;
        });
    },
    removePermission(item) {
      removePermissionByRoleId(
        this.selectedRole.role_id,
        item.permission_id
      ).then(res => {
        if (res.success) {
          this.$message.success("移除成功");
        } else {
          this.$message.success("移除失败");
        }
        this.init();
      });
    },
    addPermission(item) {
      addPermissionByRoleId(this.selectedRole.role_id, item.permission_id).then(
        res => {
          if (res.success) {
            this.$message.success("添加成功");
          } else {
            this.$message.success("添加失败");
          }
          this.init();
        }
      );
    },
    init() {
      if (this.selectedRole.role_id) {
        this.roleInfo = this.selectedRole;
        this.queryUsePermissionData();
        this.queryUnUsePermissionData();
        return;
      }
      if (this.$route.query.id) {
        queryRoleById(this.$route.query.id)
          .then(res => {
            if (res.success) {
              this.roleInfo = res.data;

              this.$emit("update:selectedRole", this.roleInfo);
              this.queryUsePermissionData();
              this.queryUnUsePermissionData();
            } else {
              this.$message.error("读取客户信息失败");
            }
          })
          .catch(() => {
            this.$message.error("读取客户信息失败");
          });
      } else {
        this.$message.error("读取客户信息失败");
      }
    }
  },
  created() {
    setTimeout(() => {
      this.init();
    }, 100);
  }
};
</script>

<style>
</style>