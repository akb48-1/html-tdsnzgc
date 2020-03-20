<template>
  <div class="home">
    <c-header></c-header>
    <c-main></c-main>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
    'c-header': () => import('./header.vue'),
    'c-main': () => import('./main.vue')
  }
}
</script>
