<template>
  <div id="app" :style="{height:mapHeight}"><!---->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    created() {
      document.body.removeChild(document.getElementById('Loading'))
    },
    computed: {
      mapHeight() {
        return $(document).height() + 'px';
      }
    }
  }
</script>

<style scoped>

</style>
