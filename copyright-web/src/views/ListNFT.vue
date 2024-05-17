<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="uploadFile">upload</button>
  </div>
</template>

<script setup lang="ts">
// import { upload } from '../api/api.ts';
const uploadFile = async () => {
  // const cid = await upload("hello world");
  console.log("=--------------");
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
