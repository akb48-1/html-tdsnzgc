<template>
    <detail></detail>
</template>

<script>
import { updateTitle } from "@/libs/cachePage";

export default {
  components: {
    'detail' : () => import('./detail.vue'),
  },

  data() {
    return {
      id: '',
      routeInfo: {}
    }
  },

  created() {
    this.routeInfo = this.$route;
    this.id = this.$route.query.id;

    var type = {
      add: '新增轮播图',
      edit: '编辑轮播图'
    }
    var title = type[this.$route.params.type] || '查看轮播图';
    updateTitle(title, this.$route.path);

  }
}
</script>