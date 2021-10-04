<template>
  <div id="app">
    <router-view> </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style>
.d-flex {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
#app {
  direction: rtl;
}
.pointer {
  cursor: pointer;
}
.text-center {
  text-align: center;
}
</style>
