<script>
import AppHeader from './components/AppHeader.vue';

export default {
  name: "App",
  components: { AppHeader },
}

</script>


<template>
  <!-- header -->
  <AppHeader />
  <!-- /header -->

  <!-- main -->
  <router-view></router-view>
  <!-- /main -->

</template>


<style lang="scss">
@use './styles/general.scss' as *;
</style>