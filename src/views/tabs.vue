<template>
    <el-tabs :value="showIndex" type="card" @tab-remove="removeTab" @tab-click="toPath" style="height: 100%;overflow-y: auto;">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.fullPath"
        :label="item.meta.title"
        :name="JSON.stringify({
          path:item.path, 
          name:item.name, 
          query: item.query, 
          params: item.params
        })"
        :closable="![homePage.path, $route.fullPath].includes(item.fullPath)"
      > 
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
      removeCachePage([JSON.parse(path).path])
    },
    toPath(path) {
      this.$router.push(JSON.parse(path.paneName))
    }
  },
  computed: {
    showIndex() {
      return JSON.stringify({path:this.$route.path, name:this.$route.name, query: this.$route.query, params: this.$route.params})
    }
  }
};
</script>
