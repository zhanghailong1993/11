<template>
  <div id="app">
    <v-header ></v-header>
    <template v-if="db">
      <router-view :db="db"></router-view>
    </template>
    <template v-else>
      <h3>Loading</h3>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
  import headerTop from './compones/header/header.vue'
  export default {
    props: ['db'],
    components: {
      'v-header': headerTop
    }
  }
</script>
