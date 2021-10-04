<template>
  <div>
    <div id="main">
      <div class="fof">
        <h1>صفحه پیدا نشد</h1>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  transition: all 0.6s;
}

#main {
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
}

.fof {
  display: table-cell;
  vertical-align: middle;
}

.fof h1 {
  font-size: 50px;
  display: inline-block;
  padding-left: 12px;
  animation: type 0.5s alternate infinite;
}

@keyframes type {
  from {
    box-shadow: inset 3px 0px 0px #888;
  }
  to {
    box-shadow: inset 3px 0px 0px transparent;
  }
}
</style>
