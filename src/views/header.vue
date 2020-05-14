<template>
  <div class="header">
    <el-row :gutter="0">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <img src="../assets/logo.png" alt="" class="logo">
        </div>
      </el-col>
      <el-col :span="20" >
        <div class="grid-content bg-purple userInfo">
          <div style="margin-right:15px;">
            <el-button @click="outLogin">注销</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { clearCachePage,  } from '@/libs/cachePage';
import { confirmTips } from "@/decorator";

export default {
  name: 'c-header',
  components: {
    
  },
  methods: {
    @confirmTips('确定注销?')
    outLogin() {
      this.$message({
        type: 'success',
        message: '已注销!'
      });
      
      this.$store.commit('setMenuList', [])
      localStorage.clear();
      location.href = '/login';
    }
  }
}
</script>
<style lang="scss" scope>
  .header {
    height: 60px;
    line-height: 60px;
  }
  .logo {
    width: 30px;
    vertical-align: middle;
    margin-left: 45px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #545c64;
    
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .userInfo {
    display: flex;
    flex-direction: row-reverse;
  }
</style>>
