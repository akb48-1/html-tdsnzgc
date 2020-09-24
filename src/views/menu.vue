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
      <div v-for="(menu) in menuList" :key="menu.route_url">
        <div v-if="menu.children">
          <el-submenu :index="menu.route_url || ''" >
            <template slot="title">
              <i :class="menu.icon"></i>
              <span slot="title">{{menu.title}}</span>
            </template >
            <template v-for="(child) in menu.children" >
              <el-menu-item :index="child.route_url || ''" :key="child.route_url" v-if="child.show_menu">{{child.title}}</el-menu-item>
            </template>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="menu.route_url || ''" v-if="menu.show_menu">
            <i :class="menu.icon"></i>
            <span slot="title">{{menu.title}}</span>
          </el-menu-item>
        </div>
      </div>

    </el-menu>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';

  export default {
    name: 'c-menu',
    data() {
      return {
        isCollapse: false
      };
    },

    methods: {
    },
    computed: {
      ...mapGetters(['menuList'])
    },
    created() {
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
