<template>
  <div>
    <div style="text-align: center;padding: 8px 0;">
      <i :class="isCollapse? 'el-icon-s-unfold' : 'el-icon-s-fold' " @click="isCollapse = !isCollapse"></i>
    </div>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo"
     :collapse="isCollapse" 
     :router="true" 
     background-color="#545c64"
     text-color="#fff"
     active-text-color="#ffd04b"
      >
      <el-menu-item index="/wecome">
        <i class="el-icon-menu"></i>
        <span slot="title">欢迎</span>
      </el-menu-item>
      <el-submenu index="/a">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
          <el-menu-item index="/page1">选项1</el-menu-item>
          <el-menu-item index="/page2">选项2</el-menu-item>
          <el-menu-item index="/page3">选项3</el-menu-item>
      </el-submenu>

      <el-menu-item index="/page4">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="/page5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'c-menu',
    data() {
      return {
        isCollapse: false
      };
    }
  }
</script>

<style lang="scss" scope>
  .el-menu-vertical-demo {
    height: calc(100% - 34px);
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
</style>
