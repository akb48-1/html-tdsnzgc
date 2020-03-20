<template>
  <div class="main">
      <c-menu class="menu"></c-menu>
      <c-container class="container"></c-container>
  </div>
</template>

<script>

export default {
  name: 'c-header',
  data() {
    return {
    }
  },
  components: {
    'c-menu': () => import('./menu.vue'),
    'c-container': () => import('./container.vue')
  },
  computed: {

  },

  
}
</script>
<style lang="scss" scope>
  .main {
    display: flex;
    height: calc(100vh - 60px);
    .container {
      height: 100%;
      width: 100%;
      padding: 12px;
      box-sizing: border-box;
    }
  }
</style>>

