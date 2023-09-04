<script setup>
import MyTree from './components/MyTree.vue'
</script>

<template>
  <div class="menu" :style="{ boxShadow: getBoxShadow() }">
    <MyTree />
  </div>
</template>

<script>
export default {
  methods: {
    getBoxShadow() {
      return `var(--el-box-shadow-dark, 0 2px 12px 0 rgba(0, 0, 0, 0.1))`;
    },
  },
};
</script>

<style scoped>
.menu {
  border: 2px solid rgb(237, 199, 127, 0.5);
  border-radius: var(--el-border-radius-round, 0px);
  position: fixed;
  left: 0px;
  top: 0px;
  overflow: auto;
  height: 100vh;
  background-color: #b3eeeb;

}
</style>