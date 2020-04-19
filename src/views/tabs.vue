<template>
    <el-tabs :value="showIndex" type="card" @tab-remove="removeTab" @tab-click="toPath" style="height: 100%;overflow-y: auto;">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.path"
        :label="item.meta.title"
        :name="item.path"
        :closable="![homePage.path, $route.path].includes(item.path)"
      > 
      <p></p>
        <component :is="item.path.replace('/', '').replace(/\//g, '-')"></component>
      </el-tab-pane>
    </el-tabs>
</template>
<script>

import { cachePage, removeCachePage } from '@/libs/cachePage'
import config from '@/config';

export default {
  data() {
    return {
      homePage: config.homePage,
      editableTabs: cachePage,
      tabIndex: 0
    };
  },
  methods: {
    removeTab(path) {
      removeCachePage([path])
    },
    toPath(path) {
      this.$router.push(path.paneName)
    }
  },
  computed: {
    showIndex() {
      return this.$route.path;
    }
  }
};
</script>
