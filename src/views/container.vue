<template>
  <div class="container">
    <c-tabs></c-tabs>
  </div>
</template>

<script>

export default {
  name: "container",
  components: {
    "c-tabs": () => import("./tabs.vue")
  }
};
</script>
