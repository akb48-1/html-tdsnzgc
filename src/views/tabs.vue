<template>
    <el-tabs :value="showIndex" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.path"
        :label="item.meta.title"
        :name="item.path"
      > 
        <component :is="item.path.replace('/', '').replace(/\//g, '-')"></component>
      </el-tab-pane>
    </el-tabs>
</template>
<script>

import { cachePage } from '@/libs/cachePage'

export default {
  data() {
    return {
      editableTabs: cachePage,
      tabIndex: 0
    };
  },
  methods: {
    removeTab(targetName) {
      // let tabs = this.editableTabs;
      // let activeName = this.showIndex;
      // if (activeName === targetName) {
      //   tabs.forEach((tab, index) => {
      //     if (tab.name === targetName) {
      //       let nextTab = tabs[index + 1] || tabs[index - 1];
      //       if (nextTab) {
      //         activeName = nextTab.name;
      //       }
      //     }
      //   });
      // }

      // // this.showIndex = activeName;
      // this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  },
  computed: {
    showIndex() {
      return this.$route.path;
    }
  }
};
</script>
