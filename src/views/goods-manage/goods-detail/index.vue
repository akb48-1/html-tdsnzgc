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
      add: '新增商品',
      edit: '编辑商品'
    }
    var title = type[this.$route.params.type] || '查看商品';
    updateTitle(title, this.$route.path);

  }
}
</script>